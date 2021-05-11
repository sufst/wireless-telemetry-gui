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
import { loginUser } from "modules/api/login";
import { showAlert } from "../slices/alert";
import { buildSensorsFromMeta, insertSensorsBulkData } from "../slices/sensors";
import { SetUserAction } from "redux/typing";
import { userGet } from "modules/api/user";
import { setUser } from "../slices/user";
import { Middleware } from "redux";
import type { ShowAlertAction } from "../slices/alert";
import type {
  SioOnMetaHander,
  SioOnDataHandler,
  UserGetResponse,
} from "modules/api/typing";
import { sioConnect } from "modules/api/sio";

// any should be rootState but I can't work out how to fix the circular dependancy issue....
export const userMiddleware: Middleware<{}, any> =
  (storeAPI) => (next) => (action) => {
    if (action.type === "user/loginUser") {
      const { username, password } = action.payload;

      loginUser(username, password)
        .then((accessToken: string) => {
          const successAlert: ShowAlertAction = {
            timeout: 3000,
            type: "snack",
            level: "success",
            text: `Login Success! ${username} successfully logged in!`,
          };

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

          if (username !== "anonymous") {
            userGet(accessToken)
            .then((data: UserGetResponse) => {
              const user: SetUserAction = {
                username: data.username,
                accessToken: accessToken,
                creation: data.creation,
                privilege: data.privilege,
                meta: JSON.parse(data.meta),
              };

              storeAPI.dispatch(setUser(user));
            })
            .catch((error: Error) => {
              const getFailedAlert: ShowAlertAction = {
                timeout: 3000,
                type: "snack",
                level: "error",
                text: `Failed to get user details :(`,
              };

              storeAPI.dispatch(showAlert(getFailedAlert));

              console.error(error);
            });
          } else {
            const user: SetUserAction = {
                username,
                accessToken,
                creation: new Date().valueOf() / 1000,
                privilege: "Anon",
                meta: {},
              };

            storeAPI.dispatch(setUser(user));
          }
        })
        .catch((error: Error) => {
          console.error(error);

          const loginFailedAlert: ShowAlertAction = {
            timeout: 3000,
            type: "alert",
            level: "error",
            text: "Login Failed :( Make sure your credentials are correct!",
          };

          storeAPI.dispatch(showAlert(loginFailedAlert));
        });

      return next(action);
    }

    return next(action);
  };
