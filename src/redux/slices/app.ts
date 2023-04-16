import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "types/models/app";

const initialState: AppState = {
  offline: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setOnline: (state: AppState) => {
      state.offline = false;
    },
    setOffline: (state: AppState) => {
      state.offline = true;
    },
  },
});

export const { setOnline, setOffline } = appSlice.actions;
export default appSlice.reducer;
