/*
    Southampton University Formula Student Team
    Copyright (C) 2021 SUFST

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
import type {
  UserState,
  LoginUserAction,
  SetUserAction,
  UserMeta
} from "redux/typing";

const initialMetaState: UserMeta = {
  dept: undefined,
  lastLogin: undefined,
  createdAt: undefined,
};

const initialState: UserState = {
  username: undefined,
  accessToken: undefined,
  isCreatingAccount: false,
  privilege: undefined,
  creation: undefined,
  meta: initialMetaState,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state: UserState, action: PayloadAction<LoginUserAction>) => {
      state.username = action.payload.username;
    },
    setUser: (state: UserState, action: PayloadAction<SetUserAction>) => {
      state.username = action.payload.username;
      state.accessToken = action.payload.accessToken;
      state.privilege = action.payload.privilege;
      state.meta = action.payload.meta;
      state.creation = action.payload.creation;
    }
  },
});

export const { loginUser, setUser } = userSlice.actions;

export default userSlice.reducer;
