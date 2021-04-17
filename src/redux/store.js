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

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import alertReducer from './slices/alertSlice'
import userReducer from './slices/user';


import { alertMiddleware } from './middleware/alert';
import { userMiddleware } from './middleware/user';

const store = configureStore({
  reducer: {
     alert: alertReducer, 
     user: userReducer
  },
  middleware: [alertMiddleware, userMiddleware, ...getDefaultMiddleware()],
})

export default store; 