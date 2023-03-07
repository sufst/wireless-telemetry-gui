import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SessionsState } from "types/models/sessions";
import {SessionsGetResponse} from "types/api/api";

const initialState: SessionsState = [];

export const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    getAllSessions: () => {},
    clearSessions: (state: SessionsState) => {
      state = initialState;
    },
    replaceSessions: (state: SessionsState, payload: PayloadAction<SessionsGetResponse>) => {
      const newSessions: SessionsState = initialState;
      console.log('payload',payload)
      for(let key in payload.payload) {
        const content = payload.payload[key]
        newSessions.push({name: key, creation: content.creation, status: content.status, sensors: content.sensors});
      }
      state = newSessions;
    },
  },
});

export const {
  getAllSessions,
  clearSessions,
  replaceSessions,
} = sessionsSlice.actions;

export default sessionsSlice.reducer;
