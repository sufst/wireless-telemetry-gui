/*
    Southampton University Formula Student Team
    Copyright (C) 2021 SUFST

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
import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { Grid } from "@mui/material";
import { createAlert } from "modules/alert/alert";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "redux/slices/alert";
import { RootState } from "redux/store";
import { SensorData } from "types/models/sensor";
import { DashStatusItemColor } from "types/models/ui-types";

// custom styles import
import {  Box,
          SensorBox,
          StatusItem,
          SensorLastValue,
          StatusText,
          DashHeader,
          GridContainer,
          CurrentSessionBoxWrapper,
          sessionButtonClasses } from "./styles";

export const DashStatusItem = ({
  name,
  data,
}: {
  name: string;
  data: SensorData[];
}) => {
  let background: DashStatusItemColor = "rgba(0, 0, 0, 0.5)";
  let text = " ";

  // Component renders this when initial state is still undefined, basically meaning
  // state has not been intiailised since socket.io is still fetching sensor data/metadata
  if (data == undefined)
    return (
      <StatusItem item lg={3} xs={12} sm={6}>
        <Box
          style={{
            backgroundColor: background,
          }}
        >
          <span>Loading</span>
        </Box>
      </StatusItem>
    );

  const lastValue = data[data?.length - 1]?.value;

  // ESLint needs to be disabled here for now, as the values are of type "number" but come in as "true" or "false"
  const checkShutdown = () => {
    // eslint-disable-next-line
    if (lastValue == 1) {
      text = "TRUE";
      background = "green";
    }
    // eslint-disable-next-line
    else if (lastValue == 0) {
      text = "FALSE";
      background = "red";
    }
  };

  const checkRTD = () => {
    // eslint-disable-next-line
    if (lastValue == 1) {
      text = "ENABLED";
      background = "green";
    }
    // eslint-disable-next-line
    else if (lastValue == 0) {
      text = "DISABLED";
      background = "red";
    }
  };

  if (name === "RTD") {
    checkRTD();
  } else if (name === "SHUTDOWN") {
    checkShutdown();
  }
  /*
    else if (name === 'ADD SENSOR HERE') {
    }
    else if (name === 'ADD SENSOR HERE') {
    }*/

  return (
    <StatusItem item lg={3} xs={12} sm={6}>
      <Box
        style={{
          backgroundColor: background,
        }}
      >
        <span>
          {name}: <StatusText>{text}</StatusText>
        </span>
      </Box>
    </StatusItem>
  );
};

export const CurrentTime: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  }, [time]);

  return (
    <DashHeader>
      Current Time:{" "}
      <span style={{fontWeight:"bold"}}>{time.toLocaleTimeString()}</span>
    </DashHeader>
  );
};

export const DashSensorsItem: React.FC<{ name: string }> = ({ name }) => {

  const sensorsSelector = (state: RootState) => state.sensors.sensors[name];
  const sensor = useSelector(sensorsSelector);

  const data = sensor?.data ?? [];
  const lastValue = data[data?.length - 1]?.value;

  return (
    <Grid item xs={12} sm={6} lg={3}>
      <SensorBox>
        <div>
          {sensor?.meta?.name}:<br />
          <SensorLastValue>{lastValue} </SensorLastValue>
          {sensor?.meta?.units}
        </div>
      </SensorBox>
    </Grid>
  );
};

export const DashSensors: React.FC = () => {

  const names = [
    "PM100_Motor_Speed",
    "PM100_Phase_A_Current",
    "PM100_BMS_Active",
    "PM100_Rolling_Counter",
  ];

  return (
    <>
      <DashHeader>Sensors</DashHeader>
      <GridContainer container spacing={2}>
        <DashSensorsItem name={names[0]} />
        <DashSensorsItem name={names[1]} />
        <DashSensorsItem name={names[2]} />
        <DashSensorsItem name={names[3]} />
      </GridContainer>
    </>
  );
};

export const DashSession = (props: {
  handleStart: (event: any, name: string) => void;
  handleStop: (event: any, name: string) => void;
}) => {
  const dispatch = useDispatch();

  // isRunning status from Redux
  const selectIsRunning = (state: RootState) => state.session.isRunning;
  const isSessionRunning = useSelector(selectIsRunning);

  // Session Name from Redux
  const selectSessionName = (state: RootState) => state.session.sessionName;
  const sessionName = useSelector(selectSessionName);
  const sessionNameLabelText: string =
    sessionName === "" ? "NOT RUNNING" : sessionName;

  // Current User from Redux
  const selectUser = (state: RootState) => state.user;
  const user = useSelector(selectUser);

  const { privilege } = user;

  // Builds a name for the session based on the current date & time.
  const buildSessionName = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    const year = date.getFullYear() - 2000;
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    const name = `${year}${month}${day}--${hour}${minute}${second}`;
    return name;
  };

  const startPressed = useCallback(
    (e) => {
      if (isSessionRunning) {
        console.log("Session is already running...");
        return;
      }

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

      const name = buildSessionName();
      props.handleStart(e, name);
    },
    [isSessionRunning, props, dispatch, privilege]
  );

  const stopPressed = useCallback(
    (e) => {
      if (!isSessionRunning) {
        console.log("No active session...");
        return;
      }

      if (privilege !== "Admin" && privilege !== "Developer") {
        const createSessionFailedAlert = createAlert(
          3000,
          "error",
          "snack",
          "Log in to stop a running session."
        );
        dispatch(showAlert(createSessionFailedAlert));
        return;
      }

      props.handleStop(e, sessionName);
    },
    [isSessionRunning, props, dispatch, privilege, sessionName]
  );

  const startButtonClasses = useCallback(() => {
    if (!isSessionRunning) {
      return sessionButtonClasses.sessionButtonStartBox;
    } else {
      return sessionButtonClasses.sessionButtonStartBoxDisabled;
    }
  }, [
    isSessionRunning,
    sessionButtonClasses.sessionButtonStartBox,
    sessionButtonClasses.sessionButtonStartBoxDisabled,
  ]);

  const stopButtonClasses = useCallback(() => {
    if (!isSessionRunning) {
      return sessionButtonClasses.sessionButtonStopBoxDisabled;
    } else {
      return sessionButtonClasses.sessionButtonStopBox;
    }
  }, [
    isSessionRunning,
    sessionButtonClasses.sessionButtonStopBox,
    sessionButtonClasses.sessionButtonStopBoxDisabled,
  ]);

  return (
    <>
      <DashHeader>Session</DashHeader>
      <GridContainer container spacing={3}>
        <Grid item xs={12} lg={4}>
          <CurrentSessionBox currentSessionName={sessionNameLabelText} />
        </Grid>
        <Grid item xs={12} lg={4} onClick={startPressed}>
          <Box sx={startButtonClasses()}>Start Session</Box>
        </Grid>
        <Grid item xs={12} lg={4} onClick={stopPressed}>
          <Box sx={stopButtonClasses()}>Stop Session</Box>
        </Grid>
      </GridContainer>
      <span
        style={{
          opacity: "0.3",
        }}
      >
        Starting a session from here will provide a default name and enable all
        sensors.
      </span>
    </>
  );
};

const CurrentSessionBox: React.FC<{ currentSessionName: string }> = ({
  currentSessionName,
}) => {

  let backgroundColor = "grey";

  if (currentSessionName === "NOT RUNNING") {
    backgroundColor = "grey";
  } else {
    backgroundColor = "darkBlue";
  }

  return (
    <CurrentSessionBoxWrapper
      bgColor = {backgroundColor}
    >
      <p>
        Current: <br />
        {currentSessionName}
      </p>
    </CurrentSessionBoxWrapper>
  );
};
