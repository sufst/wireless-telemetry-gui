/*
    Southampton University Formula Student Team
    Copyright (C) 2022 SUFST

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import React, { useState, useCallback, useEffect } from "react";
import { RootPaper } from "./styles";
import { getAllSessions } from "redux/slices/sessions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  CurrentSessionHeader,
  NewSessionContainer,
  SessionTable,
} from "./components";
import { showAlert } from "redux/slices/alert";
import { createAlert } from "modules/alert/alert";
import { startSession, stopSession } from "redux/slices/session";
import { StartSessionButtonAction } from "types/models/actions";

export const SessionContainer: React.FC = () => {
  const dispatch = useDispatch();

  // Session Name from Redux
  const selectSessionName = (state: RootState) => state.session.sessionName;
  const sessionName = useSelector(selectSessionName);

  // Session Driver from Redux
  const selectSessionDriver = (state: RootState) => state.session.sessionDriver;
  const sessionDriver = useSelector(selectSessionDriver);

  // Session Name from Redux
  const selectSessionConds = (state: RootState) =>
    state.session.sessionConditions;
  const sessionConditions = useSelector(selectSessionConds);

  // Session Sensors from Redux
  const selectSessionGrps = (state: RootState) =>
    state.session.sessionSensorGroups;
  const sessionGroups = useSelector(selectSessionGrps);

  // Session isRunning from Redux
  const selectIsRunning = (state: RootState) => state.session.isRunning;
  const isSessionRunning = useSelector(selectIsRunning);

  // All Sensor Groups from Redux
  const selectGroups = (state: RootState) => state.sensors.groups;
  const groups = useSelector(selectGroups);
  const sensorGroupNames = Object.keys(groups);

  const sessionNameLabelText: string =
    sessionName === "" ? "NOT RUNNING" : sessionName;

  // Current Logged in User from Redux
  const selectUser = (state: RootState) => state.user;
  const user = useSelector(selectUser);

  const { privilege } = user;

  dispatch(getAllSessions());
  const sessionData = useSelector((state: RootState) => state.sessions);

  const handleStartSession: StartSessionButtonAction = useCallback(
    (name, driver, condition, sessionSensorGroups) => {
      // Creates an array of all the names of the sensors to be saved in the session.
      const groupsForSession = Object.entries(groups).filter(
        (group: [key: string, value: string[]]) =>
          sessionSensorGroups.includes(group[0])
      );
      const sensors = groupsForSession
        .map((group: [key: string, value: string[]]) => group[1])
        .flat();

      console.log(sessionSensorGroups);

      dispatch(
        startSession({
          name,
          driver,
          condition,
          sensors,
          groups: sessionSensorGroups,
        })
      );
    },
    [dispatch, groups]
  );

  const onStartClicked: StartSessionButtonAction = useCallback(
    (name, driver, condition, sensors, groups) => {
      if (privilege !== "Admin" && privilege !== "Developer") {
        const createSessionFailedAlert = createAlert(
          3000,
          "error",
          "snack",
          "Login to start a new session."
        );
        dispatch(showAlert(createSessionFailedAlert));
        return;
      }

      handleStartSession(name, driver, condition, sensors, groups);
    },
    [privilege, dispatch, handleStartSession]
  );

  const onStopClicked = useCallback(() => {
    console.log("Stopping Session.");
    dispatch(stopSession());
  }, [dispatch]);

  const sessionMeta = useCallback(() => {
    return {
      name: sessionName,
      driver: sessionDriver,
      conditions: sessionConditions,
      sensorGroups: sessionGroups,
    };
  }, [sessionName, sessionDriver, sessionConditions, sessionGroups]);

  return (
    <>
      <RootPaper sx={{background: isSessionRunning ? "darkBlue": "#292929" }}>
        <CurrentSessionHeader name={sessionNameLabelText} />
      </RootPaper>
      <RootPaper>
        <NewSessionContainer
          onSubmit={onStartClicked}
          onStop={onStopClicked}
          sensorGroups={sensorGroupNames}
          isRunning={isSessionRunning}
          sessionMeta={sessionMeta()}
        />
      </RootPaper>
      <RootPaper>
        {/* TODO: Loading logic needs to go back in */}
        {/* <>
                    {!isLoading.sessions && (
                        <SessionTable sessionData={sessionData}/>
                    ) || (
                        <LinearProgress />
                    )}
                </> */}
        <SessionTable sessionData={sessionData} />
      </RootPaper>
    </>
  );
};
