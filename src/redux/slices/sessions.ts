import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetSessionsAction } from "types/models/actions";
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
      let newSessions: SessionsState = [];
      for(let key in payload.payload) {
        newSessions.push({name: key, creation: key.creation, status: key.status, sensors: key.sensors});
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
