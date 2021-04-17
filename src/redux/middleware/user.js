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


import { logIn } from "../../backend/backend"
import { show } from "../slices/alertSlice";
import { set } from "../slices/user";

export const userMiddleware = storeAPI => next => action => {

   const loginFailedAlert = {
      timeout: 1000, 
      type: 'alert', 
      level: 'error', 
      text: 'Login Failed'
   }

   const successAlert = {
      timeout: 3000, 
      type: 'snack', 
      level: 'success', 
      text: 'GOOD JOB! YOU LOGGED IN?!'
   }
   
   if (action.type === 'user/login') {
      const { username, password } = action.payload; 
      
      logIn(username, password) 
         .then(() => {
            storeAPI.dispatch(show(successAlert))

            next(set( { username } ))
         })
         .catch((error) => {
            storeAPI.dispatch(show(loginFailedAlert))
         })

      return next(action)
   }

  return next(action)
}