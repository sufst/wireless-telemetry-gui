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
      for(let key in payload.payload) {
        const content = payload.payload[key];
        newSessions.push({name: key, creation: content.creation, status: content.status, sensors: content.sensors});
      }
      state.sessions = newSessions;
    },
  },
});

export const {
  getAllSessions,
  refreshSessions,
  clearSessions,
  replaceSessions,
} = sessionsSlice.actions;

export default sessionsSlice.reducer;
