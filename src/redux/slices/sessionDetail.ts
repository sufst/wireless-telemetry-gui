/*
    Southampton University Formula Student Team
    Copyright (C) 2022 SUFST

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

import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { getSessionDetail } from "../../modules/api/sessions";
import { SessionDetailContainer, SessionDetailState } from "types/models/sessionDetail";
import { GetSessionDetailAction } from "types/models/actions";
import { useDispatch } from "react-redux";

export const sessionDetailSlice = createSlice({
  name: "sessionDetail",
  initialState: {},
  reducers: {
    /*getSession: (state: SessionDetailState, action: PayloadAction<GetSessionDetailAction>) => {
      const existingSession = state.find((session: SessionDetailContainer) => session.name === action.payload.name);
      if (existingSession) {
        return existingSession;
      } else {
        //const dispatch = useDispatch();
        //const sessionData = dispatch(fetchSessionDetail(action.payload.name));
      }
    },*/
  },
  /*extraReducers(builder) {
    builder
      .addCase(fetchSessionDetail.pending, (state, action) => {
        //state.status = 'loading'
        console.log('pending');
      })
      .addCase(fetchSessionDetail.fulfilled, (state, action) => {
        //state.status = 'succeeded'
        console.log('fulfilled');
        // Add any fetched posts to the array
        //state = state.sessionDetail.concat(action.payload)
        let sessionContainer: SessionDetailContainer = action.payload; //{name: action.payload.name, sessionDetail: action.payload.sessionDetail};
        state = state.concat(sessionContainer);
        return sessionContainer;
      })
      .addCase(fetchSessionDetail.rejected, (state, action) => {
        //state.status = 'failed'
        console.log('rejected');
        //state.error = action.error.message
      })
  }*/
});

/*const fetchSessionDetail = createAsyncThunk('sessionDetail/fetchSessionDetail', async (sessionId: string): Promise<SessionDetailContainer> => {
  const sessionData = await getSessionDetail(sessionId);
  return {name: sessionId, sessionDetail: sessionData};
});

export const { getSession } = sessionDetailSlice.actions;*/

export default sessionDetailSlice.reducer;
