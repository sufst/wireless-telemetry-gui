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
import { GetSessionDetailAction, StartSessionAction } from "types/models/actions";
import { SessionState } from "types/models/session";

const initialState: SessionState = {
    sessionName: "",
    sessionDriver: "", 
    sessionConditions: "",
    sessionSensors: [],
    sessionSensorGroups: [],
    isRunning: false, 
}

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    getAllSessions: () => {
    },
    getSessionDetail: (state: SessionState, action: PayloadAction<GetSessionDetailAction>) => {},
    startSession: (state: SessionState, action: PayloadAction<StartSessionAction>) => {      
      state.sessionName = action.payload.name
      state.sessionDriver = action.payload.driver
      state.sessionConditions = action.payload.condition
      state.sessionSensors = action.payload.sensors
      state.sessionSensorGroups = action.payload.groups
      state.isRunning = true
    },
    stopSession: (state: SessionState) => {
      state.sessionName = ""
      state.sessionDriver = ""
      state.sessionConditions = ""
      state.sessionSensors = []
      state.sessionSensorGroups = []
      state.isRunning = false
    }
  },
});

export const {
  getAllSessions,
  getSessionDetail,
  startSession,
  stopSession
} = sessionSlice.actions;

export default sessionSlice.reducer;