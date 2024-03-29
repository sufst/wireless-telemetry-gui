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
} from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import { NewSessionText, RefreshButton, SessionHeadingContainer } from "../dashboard/session/styles";
import { getSessionDetail } from "redux/slices/session";
import { useDispatch } from "react-redux";
import { SessionsState } from "types/models/sessions";
import { refreshSessions } from "redux/slices/sessions";

export const SessionPaper = () => {
  const dispatch = useDispatch();

  return (
    <SessionHeadingContainer>
      <NewSessionText header={false}>Session</NewSessionText>
      <RefreshButton
        onClick={() => dispatch(refreshSessions())}
        variant="contained"
        disableElevation
        color="secondary"
      >
        Refresh
      </RefreshButton>
    </SessionHeadingContainer>
  );
};

export const SessionTable: React.FC<{ sessionData: SessionsState }> = (
  props
) => {
  const dispatch = useDispatch();
  const info = props.sessionData.sessions.map((sessionEntry) => {
    return {
      name: sessionEntry.name,
      status: sessionEntry.status,
      created: new Date(sessionEntry.creation).toString(),
      actions: (
        <>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={() =>
              dispatch(getSessionDetail({ name: sessionEntry.name }))
            }
            size="large">
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
