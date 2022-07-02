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
import type { UserState, LoginUserAction, SetUserAction, UserMeta, RegisterUserAction } from "redux/typing";

const initialMetaState: UserMeta = {
  dept: undefined,
  lastLogin: undefined,
  createdAt: undefined,
};

const initialState: UserState = {
  username: undefined,
  accessToken: undefined,
  department: "NON SPECIFIED",
  privilege: undefined,
  creation: undefined,
  meta: initialMetaState,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getAllUsers: () => {
    },
    registerNewUser: (state: UserState, action: PayloadAction<RegisterUserAction>) => {
    },
    loginUser: (state: UserState, action: PayloadAction<LoginUserAction>) => {
    },
    setUser: (state: UserState, action: PayloadAction<SetUserAction>) => {
      state.username = action.payload.username;
      state.accessToken = action.payload.accessToken;
      state.privilege = action.payload.privilege;
      state.meta = action.payload.meta;
      state.department = action.payload.department;
      state.creation = action.payload.creation;
    }, 
    logoutUser: (state: UserState) => {
      state.username = undefined; 
    },
  },
});

export const { loginUser, setUser, logoutUser, registerNewUser, getAllUsers } = userSlice.actions;

export default userSlice.reducer;
