import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetSessionsAction, GetSessionsActionContent } from "types/models/actions";
import { SessionsState } from "types/models/sessions";

const initialState: SessionsState = [];

export const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    getAllSessions: () => {},
    clearSessions: (state: SessionsState) => {
      state = initialState;
    },
    replaceSessions: (state: SessionsState, payload: PayloadAction<GetSessionsAction>) => {
      const newSessions: SessionsState = [];
      for(let key in payload.payload) {
        const content: GetSessionsActionContent = payload.payload[key]
        newSessions.push({name: key, creation: content.creation, status: content.status, sensors: content.sensors});
      }
      state = newSessions;
    },
  },
});

export const {
  getAllSessions,
  clearSessions,
} = sessionsSlice.actions;

export default sessionsSlice.reducer;
