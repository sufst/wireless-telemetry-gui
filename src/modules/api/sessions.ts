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
import type { SessionCreate, SessionsGet, SessionStop } from "./typing";

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

const handleSessionsPost: SessionCreate = async (
  accessToken,
  sensors,
  meta
) => {
  const response = await fetch(`http://${url}/sessions/${meta.name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken
    },
    body: JSON.stringify({
      sensors,
      meta
    })
  })

  if (!response.ok) {
    throw response.statusText; 
  }

  return response; 
}

const handleSessionPatch: SessionStop = async (
  accessToken,
  name
) => {
  const response = await fetch(`http://${url}/sessions/${name}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken
    }
  })

  if (!response.ok) {
    throw response.statusText; 
  }

  return response; 
}

export const sessionCreate: SessionCreate = async (
  accessToken,
  sensors,
  meta
) => {
  try {
    const response = await handleSessionsPost(accessToken, sensors, meta) 
    
    if (response.status === 200) {
      return true; 
    }

    return false; 
  } 
  catch(statusText) {
    console.log('Error Creating Session: ', statusText);
    return false; 
  }  
};

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

export const sessionStop: SessionStop = async (
  accessToken,
  name
) => {
  try {
    const response = await handleSessionPatch(accessToken, name); 
    
    if (response.status === 200) {
      return true; 
    }

    return false; 
  } 
  catch(statusText) {
    console.log('Error Stopping Session: ', statusText);
    return false; 
  }
};
