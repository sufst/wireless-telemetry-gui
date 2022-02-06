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

// Module Imports
import { createAlert } from "modules/alert/alert";
import { createSession } from "modules/api/sessions";
import { Middleware } from "redux";
import { showAlert } from "redux/slices/alert";

// any should be rootState but I can't work out how to fix the circular dependancy issue....
export const sessionMiddleware: Middleware<{}, any> = 
  (storeAPI) => (next) => async (action) => {
    if (action.type === "session/startSession") {
        console.log('Starting session from middleware: ', action.payload.name);

        const { name } = action.payload; 
        const accessToken = storeAPI.getState().user.accessToken; 
        const sessionSensors = storeAPI.getState().sensors.sensorMetadata; 
        
        console.log(sessionSensors);
        
        const response = await createSession(accessToken, name, {}, sessionSensors)

        if (response) {
            const createSessionOkayAlert = createAlert(3000, "success", "alert", "New session created."); 
            storeAPI.dispatch(showAlert(createSessionOkayAlert));
          } else {
            const createSessionFailedAlert = createAlert(3000, "error", "alert", "Can't create a new session..."); 
            storeAPI.dispatch(showAlert(createSessionFailedAlert))
        }

        return next(action);
    } 

    return next(action);
  };