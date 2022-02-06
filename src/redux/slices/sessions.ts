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
import type { SessionState, StartStopSessionAction } from "redux/typing";

const initialState: SessionState = {
    sessionName: "",
}

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    getAllSessions: () => {
    },
    startSession: (state: SessionState, action: PayloadAction<StartStopSessionAction>) => {      
      state.sessionName = action.payload.name
    },
    stopSession: (state: SessionState, action: PayloadAction<StartStopSessionAction>) => {
      state.sessionName = "NOT RUNNING"
    }
  },
});

export const { getAllSessions, startSession, stopSession } = sessionSlice.actions;

export default sessionSlice.reducer;