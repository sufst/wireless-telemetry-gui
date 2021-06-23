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
import type { SessionsGet, SessionsGetResponse } from "./typing";

const handleSessionsGet = async () => {
  const response = await fetch(`http://${url}/sessions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if(!response.ok) {
    throw response.statusText; 
  }

  const data = await response.json(); 
  return data;
}

export const sessionsGet: SessionsGet = async () => {

  try {
    const sessionResponse = await handleSessionsGet(); 
    return sessionResponse; 
  } 
  catch (statusText) {
    console.log('Error in Sessions GET: ', statusText);
    return null;
  }
};
