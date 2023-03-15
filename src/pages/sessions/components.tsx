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
import React from "react";
import {
  Paper,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import { SessionsGetResponse } from "types/api/api";
import { useStyles } from "../dashboard/session/styles";
import { getSessionDetail } from "redux/slices/sessions";
import { useDispatch } from "react-redux";

export const SessionPaper = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.rootPaper}>
      <p className={classes.newSessionText}>Session</p>
    </Paper>
  );
};

export const SessionTable = (props: { sessionData: SessionsGetResponse }) => {
  const dispatch = useDispatch();
  const sessionEntries = Object.entries(props.sessionData);
  const info = sessionEntries.map((sessionEntry) => {
    const name = sessionEntry[0];
    const sessionInfo = sessionEntry[1];
    return {
      name,
      status: sessionInfo.status,
      created: new Date(sessionInfo.creation).toString(),
      actions: (
        <>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={() => dispatch(getSessionDetail({ name }))}
          >
            <GetAppIcon />
          </IconButton>
        </>
      ),
    };
  });
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Creation Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {info.map((sessionEntry) => (
              <TableRow key={sessionEntry.name}>
                <TableCell component="th" scope="row">
                  {sessionEntry.name}
                </TableCell>
                <TableCell align="right">{sessionEntry.status}</TableCell>
                <TableCell align="right">{sessionEntry.created}</TableCell>
                <TableCell align="right">{sessionEntry.actions}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
