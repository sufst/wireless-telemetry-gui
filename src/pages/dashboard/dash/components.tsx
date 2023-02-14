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
import React from "react";
import { Box, Grid } from "@material-ui/core";
import { createAlert } from "modules/alert/alert";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "redux/slices/alert";
import { RootState } from "redux/store";
import { SensorData } from "types/models/sensor";
import { DashStatusItemColor, DashStatusItemText } from "types/models/ui-types";
import { useStyles } from "./styles";

export const DashStatusItem: React.FC<{ name: string; data: SensorData[] }> = ({
  name,
  data,
}) => {
  const classes = useStyles();

  const lastValue = data[data?.length - 1]?.value;

  let background: DashStatusItemColor = "rgba(0, 0, 0, 0.5)";
  let text: DashStatusItemText = " ";

  const checkECU = () => {
    if (lastValue === 1) {
      text = "CONNECTED";
      background = "green";
    } else if (lastValue === 0) {
      text = "DISCONNECTED";
      background = "red";
    }
  };

  const checkEngine = () => {
    if (lastValue === 1) {
      text = "INACTIVE";
      background = "red";
    } else if (lastValue === 2) {
      text = "IDLE";
      background = "orange";
    } else if (lastValue === 3) {
      text = "ACTIVE";
      background = "green";
    }
  };

  const checkBattery = () => {
    if (lastValue === 1) {
      text = "DISCONNECTED";
      background = "grey";
    } else if (lastValue === 2) {
      text = "LOW";
      background = "red";
    } else if (lastValue === 3) {
      text = "HEALTHY";
      background = "green";
    }
  };

  const checkLogging = () => {
    if (lastValue === 0) {
      text = "INACTIVE";
      background = "red";
    } else if (lastValue === 1) {
      text = "ACTIVE";
      background = "green";
    }
  };

  if (name === "ECU") {
    checkECU();
  } else if (name === "ENGINE") {
    checkEngine();
  } else if (name === "BATTERY") {
    checkBattery();
  } else if (name === "LOGGING") {
    checkLogging();
  }

  return (
    <Grid item lg={3} xs={12} sm={6} className={classes.item}>
      <Box
        className={classes.box}
        style={{
          backgroundColor: background,
        }}
      >
        <span>
          {name}: <span className={classes.status}>{text}</span>
        </span>
      </Box>
    </Grid>
  );
};

export const CurrentTime: React.FC = () => {
  const [time, setTime] = React.useState(new Date());

  const classes = useStyles();

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  }, [time]);

  return (
    <p className={classes.currentTimeText}>
      Current Time:{" "}
      <span className={classes.time}>{time.toLocaleTimeString()}</span>
    </p>
  );
};

export const DashSensorsItem: React.FC = (props: { name: string }) => {
  const classes = useStyles();

  const sensorsSelector = (state: RootState) =>
    state.sensors.sensors[props.name];
  const sensor = useSelector(sensorsSelector);

  const data = sensor?.data ?? [];
  const lastValue = data[data?.length - 1]?.value;

  return (
    <Grid item xs={2}>
      <Box className={classes.sensorBox}>
        <div>
          {sensor?.meta?.name}:<br />
          <span className={classes.sensorLastValue}>{lastValue} </span>
          {sensor?.meta?.units}
        </div>
      </Box>
    </Grid>
  );
};

export const DashSensors: React.FC = () => {
  const classes = useStyles();

  const names = [
    "rpm",
    "water_temp_c",
    "tps_perc",
    "battery_mv",
    "speed_kph",
    "fuel_flow",
  ];

  return (
    <>
      <p className={classes.sensorsText}>Sensors</p>
      <Grid container className={classes.gridContainer} spacing={2}>
        <DashSensorsItem name={names[0]} />
        <DashSensorsItem name={names[1]} />
        <DashSensorsItem name={names[2]} />
        <DashSensorsItem name={names[3]} />
        <DashSensorsItem name={names[4]} />
        <DashSensorsItem name={names[5]} />
      </Grid>
    </>
  );
};

export const DashSession: React.FC = (props: {
  handleStart: (event: any, name: string) => void;
  handleStop: (event: any, name: string) => void;
}) => {
  const classes = useStyles();
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
      return classes.sessionButtonStartBox;
    } else {
      return classes.sessionButtonStartBoxDisabled;
    }
  }, [
    isSessionRunning,
    classes.sessionButtonStartBox,
    classes.sessionButtonStartBoxDisabled,
  ]);

  const stopButtonClasses = useCallback(() => {
    if (!isSessionRunning) {
      return classes.sessionButtonStopBoxDisabled;
    } else {
      return classes.sessionButtonStopBox;
    }
  }, [
    isSessionRunning,
    classes.sessionButtonStopBox,
    classes.sessionButtonStopBoxDisabled,
  ]);

  return (
    <>
      <p className={classes.sensorsText}>Session</p>
      <Grid container className={classes.gridContainer} spacing={3}>
        <Grid item xs={4}>
          <CurrentSessionBox currentSessionName={sessionNameLabelText} />
        </Grid>
        <Grid item xs={4} onClick={startPressed}>
          <Box className={startButtonClasses()}>Start Session</Box>
        </Grid>
        <Grid item xs={4} onClick={stopPressed}>
          <Box className={stopButtonClasses()}>Stop Session</Box>
        </Grid>
      </Grid>
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
  const classes = useStyles();

  let backgroundColor = "grey";

  if (currentSessionName === "NOT RUNNING") {
    backgroundColor = "grey";
  } else {
    backgroundColor = "darkBlue";
  }

  return (
    <Box
      className={classes.currentSessionBox}
      style={{
        backgroundColor,
      }}
    >
      <p>
        Current: <br />
        {currentSessionName}
      </p>
    </Box>
  );
};
