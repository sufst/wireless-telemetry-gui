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

import { createSlice } from "@reduxjs/toolkit";

type SetUserAction = {
    payload: {
        username: string
    } 
};

type LoginUserAction = {

};

type UserState = {
    username?: string,
    isCreatingAccount: boolean,
    meta: any
};


export const userSlice = createSlice({
   name: 'user',
   initialState: {
      username: undefined, 
      isCreatingAccount: false,
      meta: {

      },
   },
   reducers: {
      loginUser: (state: UserState, action: LoginUserAction) => {
         
      }, 
      setUser: (state: UserState, action: SetUserAction) => {
         state.username = action.payload.username;
      },
   }
})

export const { loginUser, setUser } = userSlice.actions; 

export default userSlice.reducer;