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
// TODO: Downloadjs is deprecated, needs replaced with a new library
import download from "downloadjs";
import { createAlert } from "modules/alert/alert";
import {
  createSession,
  getSessionDetail,
  stopSession,
} from "modules/api/sessions";
import { Middleware } from "redux";
import { showAlert } from "redux/slices/alert";

// any should be rootState but I can't work out how to fix the circular dependancy issue....
export const sessionMiddleware: Middleware<any, any> =
  (storeAPI) => (next) => async (action) => {
    if (action.type === "session/startSession") {
      const { name, driver, condition } = action.payload;
      const sensors: string[] = action.payload.sensors;
      const groups: string[] = action.payload.groups;

      const accessToken = storeAPI.getState().user.accessToken;

      console.log(
        "Starting session from middleware: ",
        name,
        driver,
        condition,
        sensors,
        groups
      );

      const sessionMeta = {
        driver: driver,
        condition: condition,
      };

      const [response, offline] = await createSession(
        accessToken,
        name,
        sessionMeta,
        sensors
      );

      if (response) {
        const createSessionOkayAlert = createAlert(
          3000,
          "success",
          "alert",
          "New session created."
        );
        storeAPI.dispatch(showAlert(createSessionOkayAlert));
      } else if (offline) {
        const offlineAlert = createAlert(
          3000,
          "error",
          "alert",
          "Can't create a new session as you are offline"
        );
        storeAPI.dispatch(showAlert(offlineAlert));
      } else {
        const createSessionFailedAlert = createAlert(
          3000,
          "error",
          "alert",
          "Can't create a new session..."
        );
        storeAPI.dispatch(showAlert(createSessionFailedAlert));
      }

      if (response != null) {
        const createSessionOkayAlert = createAlert(
          3000,
          "success",
          "alert",
          "New session created."
        );
        storeAPI.dispatch(showAlert(createSessionOkayAlert));
      } else {
        const createSessionFailedAlert = createAlert(
          3000,
          "error",
          "alert",
          "Can't create a new session..."
        );
        storeAPI.dispatch(showAlert(createSessionFailedAlert));
      }

      return next(action);
    }

    if (action.type === "session/stopSession") {
      const accessToken = storeAPI.getState().user.accessToken;
      const name = storeAPI.getState().session.sessionName;

      console.log("Stopping session from middleware: ", name);

      const [response, offline] = await stopSession(name, accessToken);

      if (response) {
        const stopSessionOkayAlert = createAlert(
          3000,
          "success",
          "alert",
          "Session Stopped."
        );
        storeAPI.dispatch(showAlert(stopSessionOkayAlert));
      } else if (offline) {
        const offlineAlert = createAlert(
          3000,
          "error",
          "alert",
          "Can't stop session as you are offline"
        );
        storeAPI.dispatch(showAlert(offlineAlert));
      } else {
        const stopSessionFailedAlert = createAlert(
          3000,
          "error",
          "alert",
          "Can't stop session..."
        );
        storeAPI.dispatch(showAlert(stopSessionFailedAlert));
      }

      return next(action);
    }

    if (action.type === "session/getSessionDetail") {
      const [response, offline] = await getSessionDetail(
        action.payload.name,
        storeAPI.getState().user.accessToken
      );
      if (offline) {
        const offlineAlert = createAlert(
          3000,
          "error",
          "alert",
          "Can't download sessions as you are offline"
        );
        storeAPI.dispatch(showAlert(offlineAlert));
      } else {
        download(response, action.payload.name + ".zip", "application/zip");
      }
    }

    return next(action);
  };
