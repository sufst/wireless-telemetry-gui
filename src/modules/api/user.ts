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
import { userMiddleware } from "redux/middleware/user";
import { SetUserAction, UserState } from "redux/typing";
import { UserGet, UserGetResponse, UserPatch } from "./typing";

export const handleGetUser: UserGet = async (accessToken) => {
  const response = await fetch(`http://${url}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  })

  if (!response.ok) {
    throw response.statusText; 
  }

  const data = await response.json(); 
  return data; 
}

export const getUser = async (username: string, accessToken: string) => {

  const user: SetUserAction = {
    username,
    accessToken,
    creation: new Date().valueOf() / 1000,
    privilege: "Anon",
    department: "NON SPECIFIED",
    meta: {},
  };

  if (username === 'anonymous') {
    return user; 
  }

  try {
    const data = await handleGetUser(accessToken); 
    console.log(data);
    
    user.username = data.username
    user.creation = data.creation
    user.privilege = data.privilege
    user.department = data.department
    user.meta = JSON.parse(data.meta)
  } 
  catch(statusText) {
    console.error('Error Getting User:', statusText);
    return null; 
  }

  return user; 
}

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
