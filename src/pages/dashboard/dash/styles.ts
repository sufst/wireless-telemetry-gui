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

import { makeStyles } from "@mui/material/styles";

import { styled } from '@mui/material/styles';
const PREFIX = 'styles';

const classes = {
  rootPaper: `${PREFIX}-rootPaper`,
  gridContainer: `${PREFIX}-gridContainer`,
  item: `${PREFIX}-item`,
  box: `${PREFIX}-box`,
  status: `${PREFIX}-status`,
  currentTimeText: `${PREFIX}-currentTimeText`,
  time: `${PREFIX}-time`,
  startSessionBtn: `${PREFIX}-startSessionBtn`,
  sensorBox: `${PREFIX}-sensorBox`,
  sessionButtonStartBox: `${PREFIX}-sessionButtonStartBox`,
  sessionButtonStartBoxDisabled: `${PREFIX}-sessionButtonStartBoxDisabled`,
  sessionButtonStopBox: `${PREFIX}-sessionButtonStopBox`,
  sessionButtonStopBoxDisabled: `${PREFIX}-sessionButtonStopBoxDisabled`,
  currentSessionBox: `${PREFIX}-currentSessionBox`,
  sessionStatusText: `${PREFIX}-sessionStatusText`,
  sensorsText: `${PREFIX}-sensorsText`,
  sensorLastValue: `${PREFIX}-sensorLastValue`
};

const Root = styled('https://www.gnu.org/licenses/')((
  {
    theme
  }
) => ({
  [`& .${classes.rootPaper}`]: {
    flexGrow: 1,
    padding: "1rem",
    marginBottom: "1rem",
    marginTop: "1rem",
    background: "#292929",
  },

  [`& .${classes.gridContainer}`]: {
    marginBottom: "0.5rem",
  },

  [`& .${classes.item}`]: {
    height: "130px",
  },

  [`& .${classes.box}`]: {
    color: "white",
    overflow: "hidden",
    height: "120px",
    fontSize: "20px",
    borderRadius: "10px",
    backgroundColor: "green",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  [`& .${classes.status}`]: {
    fontWeight: "bold",
  },

  [`& .${classes.currentTimeText}`]: {
    fontSize: "20px",
    margin: "0",
    marginBottom: "0.5rem",
    padding: "0",
  },

  [`& .${classes.time}`]: {
    fontWeight: "bold",
  },

  [`& .${classes.startSessionBtn}`]: {
    color: "red",
  },

  [`& .${classes.sensorBox}`]: {
    color: "white",
    overflow: "hidden",
    height: "120px",
    textAlign: "center",
    fontSize: "20px",
    borderRadius: "10px",
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  },

  [`& .${classes.currentSessionBox}`]: {
    color: "white",
    overflow: "hidden",
    height: "80px",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
    borderRadius: "10px",
    backgroundColor: "gray",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  [`& .${classes.sessionStatusText}`]: {
    color: "red",
    fontWeight: "bold",
    margin: "0.5rem 0",
    fontSize: "20px",
  },

  [`& .${classes.sensorsText}`]: {
    margin: "0",
    marginBottom: "0.5rem",
    fontSize: "20px",
  },

  [`& .${classes.sensorLastValue}`]: {
    fontWeight: "bold",
  }
}));

export {};
