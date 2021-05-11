/*
    Southampton University Formula Student Team
    Copyright (C) 2021 Nathan Rowley-Smith

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
import { url } from "config";
import { UserGet, UserGetResponse, UserPatch } from "./typing";

export const userGet: UserGet = (accessToken) => {
  return new Promise((resolve, reject) => {
    fetch(`http://${url}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw response.statusText;
        }
        return response.json();
      })
      .then((data: UserGetResponse) => {
        resolve(data);
      })
      .catch((error: Error) => reject(error));
  });
};

export const userPatch: UserPatch = (accessToken, fields) => {
  return new Promise((resolve, reject) => {
    fetch(`http://${url}/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify(fields),
    })
      .then((response) => {
        if (!response.ok) {
          throw response.statusText;
        } else {
          resolve(null);
        }
      })
      .catch((error: Error) => reject(error));
  });
};
