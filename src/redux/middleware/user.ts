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

// Module Imports
import { Middleware } from "redux";

// Redux Imports
import { showAlert } from "../slices/alert";
import { buildSensorsFromMeta, insertSensorsBulkData } from "../slices/sensors";
import { setUser } from "../slices/user";

// Custom Imports
import { createAlert } from "modules/alert/alert";
import { loginUser } from "modules/api/login";
import { getUser } from "modules/api/user";
import { sioConnect } from "modules/api/sio";
import { usersCreate } from "modules/api/users";
import { SioOnDataHandler, SioOnMetaHander } from "types/api/api";
import { setOffline, setOnline } from "redux/slices/app";

// any should be rootState but I can't work out how to fix the circular dependancy issue....
export const userMiddleware: Middleware<any, any> =
  (storeAPI) => (next) => async (action) => {
    if (action.type === "user/loginUser") {
      const { username, password } = action.payload;

      const [accessToken, offline] = await loginUser(username, password);

      if (offline) {
        storeAPI.dispatch(setOffline());
        return next(action);
      } else if (accessToken === undefined) {
        const loginFailedAlert = createAlert(
          3000,
          "error",
          "alert",
          "Login Failed :( Make sure your credentials are correct!"
        );
        storeAPI.dispatch(showAlert(loginFailedAlert));
        return next(action);
      }

      storeAPI.dispatch(setOnline());

      const successAlert = createAlert(
        3000,
        "success",
        "snack",
        `Login Success! ${username} successfully logged in!`
      );

      storeAPI.dispatch(showAlert(successAlert));

      const onMeta: SioOnMetaHander = (meta) => {
        storeAPI.dispatch(buildSensorsFromMeta(meta));
      };

      const onData: SioOnDataHandler = (data) => {
        storeAPI.dispatch(insertSensorsBulkData(data));
      };

      sioConnect(
        accessToken,
        (meta) => onMeta(meta),
        (data) => onData(data)
      );

      const user = await getUser(username, accessToken);

      if (user == null) {
        const getFailedAlert = createAlert(
          3000,
          "error",
          "snack",
          "Failed to get user details :("
        );
        storeAPI.dispatch(showAlert(getFailedAlert));
      } else {
        storeAPI.dispatch(setUser(user));
      }

      return next(action);
    }

    if (action.type === "user/registerNewUser") {
      const { username, password, privilege, department } = action.payload;
      const accessToken = storeAPI.getState().user.accessToken;

      const success = await usersCreate(
        username,
        password,
        privilege,
        department,
        {},
        accessToken
      );

      if (success) {
        storeAPI.dispatch(setOnline());
        const registerSuccessAlert = createAlert(
          3000,
          "success",
          "alert",
          "Success!! You can logout and login again with the new account."
        );

        storeAPI.dispatch(showAlert(registerSuccessAlert));
      } else {
        const registerFailedAlert = createAlert(
          3000,
          "error",
          "alert",
          "Something went wrong when creating a new user :("
        );

        storeAPI.dispatch(showAlert(registerFailedAlert));
      }
    }

    if (action.type === "user/getAllUsers") {
      const accessToken = storeAPI.getState().user.accessToken;
      console.log("Getting ALL users...", accessToken);
    }

    return next(action);
  };
