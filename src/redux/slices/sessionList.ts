import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetSessionListAction } from "types/models/actions";
import { SessionListItem, SessionListState, createSessionListState } from "types/models/sessionList";

const initialState: SessionListState = createSessionListState();

export const sessionListSlice = createSlice({
  name: "sessionList",
  initialState,
  reducers: {
    getAllSessions: () => {},
    clearSessions: (state: SessionListState) => {
      state = initialState;
    },
    replaceSessions: (state: SessionListState, payload: PayloadAction<GetSessionListAction>) => {
      let sessionList: SessionListState = [];
      const data: GetSessionListAction = payload.payload;
      for(let key of Object.keys(data)) {
        //
      }
      state = sessionList;
    },
  },
});

export const {
  getAllSessions,
  clearSessions,
} = sessionListSlice.actions;

export default sessionListSlice.reducer;
