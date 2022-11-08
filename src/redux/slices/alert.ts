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

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShowAlertAction } from 'types/models/actions';
import { AlertState } from 'types/models/alert';

const initialState: AlertState = {
	timeout: undefined,
	level: undefined,
	type: undefined,
	text: undefined
};

const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		showAlert: (state: AlertState, action: PayloadAction<ShowAlertAction>) => {
			state.timeout = action.payload.timeout;
			state.level = action.payload.level;
			state.type = action.payload.type;
			state.text = action.payload.text;
		},
		removeAlert: (state: AlertState) => {
			state.timeout = undefined;
			state.level = undefined;
			state.type = undefined;
			state.text = undefined;
		}
	}
});

export const { showAlert, removeAlert } = alertSlice.actions;
export type { ShowAlertAction };
export default alertSlice.reducer;
