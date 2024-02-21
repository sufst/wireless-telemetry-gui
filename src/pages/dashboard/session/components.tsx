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

import React, { useState, useCallback } from "react";
import {
  Paper,
  Box,
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  Grid, } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import { useDispatch } from "react-redux";
import { refreshSessions } from "redux/slices/sessions";
import { SessionsState } from "types/models/sessions";
import {
  sessionTableClasses,
  SessionButtonBox,
  RootPaper,
  NewSessionTextField,
  NewSessionText,
  SensorChooserBox,
  RefreshButton,
  SessionHeadingContainer,
  SessionAlreadyRunning,
  CurrentSessionTypography } from "./styles";

export const CurrentSessionHeader: React.FC<{ name: string }> = ({ name }) => {

  return (
    <CurrentSessionTypography variant="h6">
      <span style={{color: "#eee"}}>Current Session: </span>
      <span style={{fontWeight: "bold"}}>{name}</span>
    </CurrentSessionTypography>
  );
};

export const SessionPaper: React.FC = () => {

  return (
    <RootPaper>
      <NewSessionText header={false}>Session</NewSessionText>
    </RootPaper>
  );
};

interface NewSessionContainerProps {
  onSubmit: any;
  onStop: () => void;
  sensorGroups: string[];
  isRunning: boolean;
  sessionMeta: {
    name: string;
    driver: string;
    conditions: string;
    sensorGroups: string[];
  };
}

export const NewSessionContainer: React.FC<NewSessionContainerProps> = (
  props
) => {

  const [name, setName] = useState<string>(props.sessionMeta.name);
  const [driver, setDriver] = useState(props.sessionMeta.driver);
  const [condition, setCondition] = useState(props.sessionMeta.conditions);
  const [sensorGroups, setSensorGroups] = useState<string[]>(
    props.sessionMeta.sensorGroups
  );

  // Error state for the MUI FormControl
  const [error, setError] = useState(false);

  const isSessionRunning = props.isRunning;

  const startPressed = useCallback(() => {
    if (name === "" || sensorGroups.length === 0) {
      setError(true);
      return;
    }
    console.log("Starting: ", name, driver, condition, sensorGroups);

    props.onSubmit(name, driver, condition, sensorGroups);
  }, [name, driver, condition, sensorGroups, props]);

  const stopPressed = useCallback(() => {
    props.onStop();
    setCondition("");
    setDriver("");
    setName("");
    setSensorGroups([]);
  }, [props]);

  // Called when one of the checkboxes is clicked.
  // Sets the sensorGroups state array with the new values.
  const onSensorChange = useCallback(
    (newSensorGroup: string) => {
      if (sensorGroups.includes(newSensorGroup)) {
        setSensorGroups(
          sensorGroups.filter((sensorGroup) => sensorGroup !== newSensorGroup)
        );
      } else {
        const newSensors = sensorGroups.concat(newSensorGroup);
        setSensorGroups(newSensors);
      }
    },
    [sensorGroups]
  );

  return (
    <>
      <NewSessionText header={true}>New Session</NewSessionText>
      <FormControl error={error}>
        <Box>
          <NewSessionTextField
            label="Session Name"
            leftMargin = {false}
            value={name}
            disabled={isSessionRunning}
            helperText={isSessionRunning ? "Session is already running" : null}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <NewSessionTextField
            label="Driver"
            leftMargin = {true}
            value={driver}
            disabled={isSessionRunning}
            onChange={(e) => {
              setDriver(e.target.value);
            }}
          />
          <NewSessionTextField
            label="Conditions"
            leftMargin = {true}
            value={condition}
            disabled={isSessionRunning}
            onChange={(e) => {
              setCondition(e.target.value);
            }}
          />
        </Box>
        <SensorChooser
          allGroups={props.sensorGroups}
          selectedGroups={sensorGroups}
          onSensorChangeCallback={onSensorChange}
          disabled={isSessionRunning}
        />
        {isSessionRunning && (
          <SessionAlreadyRunning>
            Session is already running. You can&apos;t edit these now.
          </SessionAlreadyRunning>
        )}
        {error && (
          <FormHelperText>
            Set a name and choose at least one sensor
          </FormHelperText>
        )}
        <Grid container sx={{marginBottom: "0.5rem"}} spacing={3}>
          <Grid item xs={4} onClick={startPressed}>
            <SessionButtonBox
              type="start"
              disabled={isSessionRunning ? true : false}
            >
              Start Session
            </SessionButtonBox>
          </Grid>
          <Grid item xs={4} onClick={stopPressed}>
            <SessionButtonBox
              type="stop"
              disabled={isSessionRunning ? false : true}
            >
              Stop Session
            </SessionButtonBox>
          </Grid>
        </Grid>
      </FormControl>
    </>
  );
};

interface sensorChooserInterface {
  allGroups: string[];
  selectedGroups: string[];
  onSensorChangeCallback: (sensor: string) => void;
  disabled: boolean;
}

export const SensorChooser = (props: sensorChooserInterface) => {
  const checkboxes = props.allGroups.map((groupName) => {
    return (
      <FormControlLabel
        id={groupName}
        control={
          <Checkbox
            id={groupName}
            checked={props.selectedGroups.includes(groupName)}
            onChange={() => props.onSensorChangeCallback(groupName)}
            style={{ color: "lightBlue" }}
          />
        }
        label={groupName}
        disabled={props.disabled}
        key={groupName}
      />
    );
  });

  return (
    <SensorChooserBox>
      <FormLabel
        component="legend"
        sx={{ paddingTop: "0.7rem",
              marginRight: "1rem",}}
      >
        Sensors
      </FormLabel>
      {checkboxes}
    </SensorChooserBox>
  );
};

export const SessionTable = (props: { sessionData: SessionsState }) => {

  const dispatch = useDispatch();

  const sessions = props.sessionData.sessions;
  const sortedSessions = sessions
    .concat()
    .sort((a, b) => b.creation - a.creation);
  const last10Sessions = sortedSessions.slice(0, 10);

  const tableSessionInfo = last10Sessions.map((sessionEntry) => {
    const creationDate = new Date(0);
    creationDate.setUTCSeconds(sessionEntry.creation);
    const day = creationDate.getDate();
    const month = creationDate.getMonth() + 1;
    const year = creationDate.getFullYear();
    const createdString = day + "/" + month + "/" + year;

    return {
      name: sessionEntry.name,
      status: sessionEntry.status,
      created: createdString,
      actions: (
        <>
          {/* TODO: Add callback to download data and add button to stop session */}
          <IconButton color="primary" component="span" size="large">
            <GetAppIcon />
          </IconButton>
        </>
      ),
      statusClassName:
        sessionEntry.status === "alive"
          ? sessionTableClasses.aliveStatusText
          : sessionTableClasses.deadStatusText,
    };
  });

  return (
    <div>
      <SessionHeadingContainer>
        <NewSessionText header={false}>All Sessions</NewSessionText>
        <RefreshButton
          onClick={() => dispatch(refreshSessions())}
          variant="contained"
          disableElevation
          color="primary"
        >
          Refresh
        </RefreshButton>
      </SessionHeadingContainer>

      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell sx={sessionTableClasses.headerText}>Name</TableCell>
              <TableCell align="right" sx={sessionTableClasses.headerText}>
                Status
              </TableCell>
              <TableCell align="right" sx={sessionTableClasses.headerText}>
                Creation Date
              </TableCell>
              <TableCell align="right" sx={sessionTableClasses.headerText}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tableSessionInfo.map((sessionEntry) => (
              <TableRow key={sessionEntry.name}>
                <TableCell sx={sessionTableClasses.plainText}>
                  {sessionEntry.name}
                </TableCell>
                <TableCell
                  align="right"
                  sx={sessionEntry.statusClassName}
                >
                  {sessionEntry.status}
                </TableCell>
                <TableCell align="right" sx={sessionTableClasses.plainText}>
                  {sessionEntry.created}
                </TableCell>
                <TableCell align="right">{sessionEntry.actions}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
