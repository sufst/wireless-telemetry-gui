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
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSession, stopSession } from "redux/slices/session";
import { RootState } from "redux/store";
import {
  DashStatusItem,
  CurrentTime,
  DashSensors,
  DashSession,
} from "./components";

// import custom styles
import { Grid, Paper } from "./styles";

const Dash = () => {
  //
  // TODO: These sensors are hardcoded in for now.
  // They should be set from attributes in the DBC file.
  //
  const _RTD = "VCU_Ready_To_Drive";
  const _SHUTDOWN = "VCU_Shutdown";
  const _APPS = "VCU_APPS";
  const _BPS = "VCU_BPS";

  const dispatch = useDispatch();

  // All Sensor Groups from Redux
  const selectGroups = (state: RootState) => state.sensors.groups;
  const groups = useSelector(selectGroups);
  const sensorGroupNames = Object.keys(groups);

  // All Sensors from Redux
  const selectAllSensors = (state: RootState) => state.sensors.sensorMetadata;
  const allSensorMeta = useSelector(selectAllSensors);
  const allSensors = Object.keys(allSensorMeta);

  const rtdSelector = (state: RootState) => state.sensors.sensors[_RTD]?.data;
  const rtdSensorData = useSelector(rtdSelector);

  const appsSelector = (state: RootState) => state.sensors.sensors[_APPS]?.data;
  const appsSensorData = useSelector(appsSelector);

  const bpsSelector = (state: RootState) => state.sensors.sensors[_BPS]?.data;
  const bpsSensorData = useSelector(bpsSelector);

  const shutdownSelector = (state: RootState) =>
    state.sensors.sensors[_SHUTDOWN]?.data;
  const shutdownSensorData = useSelector(shutdownSelector);

  const handleStopSession = useCallback(
    (e, name) => {
      dispatch(stopSession());
    },
    [dispatch]
  );

  const handleStartSession = useCallback(
    (e, name) => {
      console.log("Starting From Component: ", name);
      const driver = "";
      const condition = "";
      const sensors: string[] = allSensors;
      const groups: string[] = sensorGroupNames;
      dispatch(startSession({ name, driver, condition, sensors, groups }));
    },
    [dispatch, allSensors, sensorGroupNames]
  );

  return (
    <>
      <Paper>
        <CurrentTime />
        <Grid container spacing={3}>
          <DashStatusItem name="RTD" data={rtdSensorData} />
          <DashStatusItem name="SHUTDOWN" data={shutdownSensorData} />
          <DashStatusItem name="" data={bpsSensorData} />
          <DashStatusItem name="" data={shutdownSensorData} />
        </Grid>
      </Paper>
      <Paper>
        <DashSensors />
      </Paper>
      <Paper>
        <DashSession
          handleStart={handleStartSession}
          handleStop={handleStopSession}
        />
      </Paper>
    </>
  );
};

export default Dash;
