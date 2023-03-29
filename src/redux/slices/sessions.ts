/* eslint-disable @typescript-eslint/no-empty-function */
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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SessionsArray, SessionsState } from "types/models/sessions";
import {SessionsGetResponse} from "types/api/api";

const initialState: SessionsState = {sessions: []};


export const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    getAllSessions: () => {},
    refreshSessions: () => {},
    clearSessions: (state: SessionsState) => {
      state.sessions = [];
    },
    replaceSessions: (state: SessionsState, payload: PayloadAction<SessionsGetResponse>) => {
      const newSessions: SessionsArray = [];
      for(const key in payload.payload) {
        const content = payload.payload[key];
        newSessions.push({name: key, creation: content.creation, status: content.status, sensors: content.sensors});
      }
      state.sessions = newSessions;
    },
  },
});

export const {
  refreshSessions,
  clearSessions,
  replaceSessions,
} = sessionsSlice.actions;

export default sessionsSlice.reducer;