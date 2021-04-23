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


import { loginUser, sio } from "modules/backend/backend"
import { showAlert } from "../slices/alert";
import { buildSensorsFromMeta, insertSensorsBulkData } from "../slices/sensors";
import { setUser } from "../slices/user";

export const userMiddleware = storeAPI => next => action => {

   const loginFailedAlert = {
      timeout: 3000, 
      type: 'alert', 
      level: 'error', 
      text: 'Login Failed :( Make sure your credentials are correct!'
   }
   
   if (action.type === 'user/loginUser') {
      const { username, password } = action.payload; 

      const successAlert = {
         timeout: 3000, 
         type: 'snack', 
         level: 'success', 
         text: `Login Success! ${username} successfully logged in!`
      }
      
      loginUser(username, password) 
         .then(() => {
            storeAPI.dispatch(showAlert(successAlert))

            sio.on("meta", message => {
               const meta = JSON.parse(message);
               console.log(meta);
               storeAPI.dispatch(buildSensorsFromMeta(meta));
            })

            sio.on("data", message => {
               const data = JSON.parse(message);

               //console.log(data);
               
               storeAPI.dispatch(insertSensorsBulkData(data))
            });

            next(setUser( { username } ))
         })
         .catch((error) => {
            // TODO: Show error in UI
            console.error(error);
            storeAPI.dispatch(showAlert(loginFailedAlert))
         })

      return next(action)
   }

  return next(action)
}