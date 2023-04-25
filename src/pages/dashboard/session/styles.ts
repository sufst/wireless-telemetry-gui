/*
    Southampton University Formula Student Team
    Copyright (C) SUFST

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

import { makeStyles, Theme, createStyles } from "@mui/material/styles";

import { styled } from '@mui/material/styles';
const PREFIX = 'styles';

const classes = {
  root: `${PREFIX}-root`,
  rootPaper: `${PREFIX}-rootPaper`,
  rootPaperRunningSession: `${PREFIX}-rootPaperRunningSession`,
  newSessionText: `${PREFIX}-newSessionText`,
  heading: `${PREFIX}-heading`,
  currentSessionTypo: `${PREFIX}-currentSessionTypo`,
  currentSessionText: `${PREFIX}-currentSessionText`,
  startStopBtn: `${PREFIX}-startStopBtn`,
  newSessionWrapper: `${PREFIX}-newSessionWrapper`,
  newSessionSubmitBtn: `${PREFIX}-newSessionSubmitBtn`,
  newSessionTextField: `${PREFIX}-newSessionTextField`,
  newSessionTextFieldMargin: `${PREFIX}-newSessionTextFieldMargin`,
  sessionName: `${PREFIX}-sessionName`,
  refreshButton: `${PREFIX}-refreshButton`,
  rootSessionPaper: `${PREFIX}-rootSessionPaper`,
  sessionHeadingContainer: `${PREFIX}-sessionHeadingContainer`,
  sessionButtonStopBox: `${PREFIX}-sessionButtonStopBox`,
  sessionButtonStartBox: `${PREFIX}-sessionButtonStartBox`,
  gridContainer: `${PREFIX}-gridContainer`,
  formLabel: `${PREFIX}-formLabel`,
  sessionAlreadyRunningText: `${PREFIX}-sessionAlreadyRunningText`,
  sensorChooserBox: `${PREFIX}-sensorChooserBox`,
  sessionButtonStartBoxDisabled: `${PREFIX}-sessionButtonStartBoxDisabled`,
  sessionButtonStopBoxDisabled: `${PREFIX}-sessionButtonStopBoxDisabled`
};

const Root = styled('https://www.gnu.org/licenses/')((
  {
    theme: Theme
  }
) => ({
  [`& .${classes.root}`]: {
    width: "100%",
    margin: "0",
  },

  [`& .${classes.rootPaper}`]: {
    flexGrow: 1,
    padding: "1rem",
    marginBottom: "1rem",
    marginTop: "1rem",
    background: "#292929",
  },

  [`& .${classes.rootPaperRunningSession}`]: {
    flexGrow: 1,
    padding: "1rem",
    marginBottom: "1rem",
    marginTop: "1rem",
    background: "darkBlue",
  },

  [`& .${classes.newSessionText}`]: {
    margin: "auto",
    flexGrow: 1,
    fontSize: "20px",
  },

  [`& .${classes.heading}`]: {
    fontSize: theme.typography.pxToRem(15),
  },

  [`& .${classes.currentSessionTypo}`]: {
    textAlign: "center",
  },

  [`& .${classes.currentSessionText}`]: {
    color: "#eee",
  },

  [`& .${classes.startStopBtn}`]: {
    marginLeft: "1rem",
  },

  [`& .${classes.newSessionWrapper}`]: {
    margin: "1rem 1rem 0 1rem",
    backgroundColor: "#292929",
  },

  [`& .${classes.newSessionSubmitBtn}`]: {
    marginLeft: "0.5rem",
  },

  [`& .${classes.newSessionTextField}`]: {
    marginBottom: "1rem",
    width: "200px",
  },

  [`& .${classes.newSessionTextFieldMargin}`]: {
    marginLeft: "1rem",
    marginBottom: "1rem",
    width: "200px",
  },

  [`& .${classes.sessionName}`]: {
    fontWeight: "bold",
  },

  [`& .${classes.refreshButton}`]: {
    backgroundColor: "green",
  },

  [`& .${classes.rootSessionPaper}`]: {
    marginTop: "1rem",
  },

  [`& .${classes.sessionHeadingContainer}`]: {
    display: "flex",
    marginBottom: "1rem",
  },

  [`& .${classes.sessionButtonStopBox}`]: {
    color: "white",
    overflow: "hidden",
    height: "80px",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
    borderRadius: "10px",
    backgroundColor: "darkOrange",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    "&:hover": {
      cursor: "pointer",
      filter: "brightness(125%)",
    },
  },

  [`& .${classes.sessionButtonStartBox}`]: {
    color: "white",
    overflow: "hidden",
    height: "80px",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
    borderRadius: "10px",
    backgroundColor: "green",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    "&:hover": {
      cursor: "pointer",
      filter: "brightness(125%)",
    },
  },

  [`& .${classes.gridContainer}`]: {
    marginBottom: "0.5rem",
  },

  [`& .${classes.formLabel}`]: {
    paddingTop: "0.7rem",
    marginRight: "1rem",
  },

  [`& .${classes.sessionAlreadyRunningText}`]: {
    marginTop: "-10px",
    fontWeight: "bold",
    color: "red",
    opacity: "70%",
  },

  [`& .${classes.sensorChooserBox}`]: {
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  [`& .${classes.sessionButtonStartBoxDisabled}`]: {
    color: "white",
    overflow: "hidden",
    height: "80px",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
    borderRadius: "10px",
    backgroundColor: "darkGray",
    opacity: "60%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  [`& .${classes.sessionButtonStopBoxDisabled}`]: {
    color: "white",
    overflow: "hidden",
    height: "80px",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
    borderRadius: "10px",
    backgroundColor: "darkGray",
    opacity: "60%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
}));

export {};

export const sessionTableStyles = makeStyles((theme) => ({
  headerText: {
    fontWeight: "bold",
    fontSize: "20px",
  },
  plainText: {
    fontSize: "18px",
  },
  aliveStatusText: {
    fontSize: "18px",
    color: "green",
  },
  deadStatusText: {
    fontSize: "18px",
    color: "red",
  },
}));
