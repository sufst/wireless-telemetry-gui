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

type SetUserAction = {
    username: string
};

type LoginUserAction = {

};

type UserState = {
    username?: string,
    isCreatingAccount: boolean,
    meta: any
};

const initialState: UserState = {
    username: undefined, 
    isCreatingAccount: false,
    meta: {

    }
};


export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      loginUser: (state: UserState, action: PayloadAction<LoginUserAction>) => {
         
      }, 
      setUser: (state: UserState, action: PayloadAction<SetUserAction>) => {
         state.username = action.payload.username;
      },
   }
})

export const { loginUser, setUser } = userSlice.actions; 

export default userSlice.reducer;