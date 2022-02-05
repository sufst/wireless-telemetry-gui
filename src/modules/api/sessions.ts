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

import { url } from "config";
import type { SessionsGet, SessionCreate, SessionCreateFields, SessionStop } from "./typing";

/**
 * Creating new sessions 
 * @param accessToken JWT authentication token 
 * @param name Name for new session
 * @param fields Object housing the session metadata and sensors to be saved. 
 */
const handleCreateSession: SessionCreate = async (accessToken, name, fields) => {
  const response = await fetch(`http://${url}/sessions/${name}`, {
    method: "POST", 
    headers: {
      "Context-Type": "application/json", 
      Authorization: "Bearer " + accessToken,
    }, 
    body: JSON.stringify({
      meta: fields.sessionMetadata, 
      sensors: fields.sessionSensors
    })
  })

  if (!response.ok) {
    throw response.statusText; 
  }

  const data = await response.json(); 
  return data; 
}

export const createSession = async (accessToken: string, name: string, sessionMeta: object, sessionSensors: object) => {

  const fields: SessionCreateFields = {
    sessionMetadata: sessionMeta, 
    sessionSensors: sessionSensors
  };

  try {
    const response = await handleCreateSession(accessToken, name, fields); 
    return response;
  } 
  catch (statusText) {
    console.log('Error creating new session: ', statusText);
    return null;
  }
}

/**
 * Stopping a currently alive session 
 * @param name Name of session to be stopped. 
 * @param accessToken JWT authentication token 
 */
const handleSessionStop = async (name: string, accessToken: string) => {
  const response = await fetch(`http://${url}/sessions/${name}`, {
    method: "PATCH", 
    headers: {
      "Context-Type": "application/json", 
      Authorization: "Bearer " + accessToken,
    }, 
    body: JSON.stringify({
      status: 'dead'
    })
  })

  if(!response.ok) {
    throw response.statusText; 
  }

  const data = await response.json(); 
  return data;
}

export const stopSession: SessionStop = async (name, token) => {
  try {
    const response = await handleSessionStop(name, token); 
    return response; 
  } 
  catch (statusText) {
    console.log('Error Stopping session: ', statusText);
    return null;
  }
}

/**
 * Getting all the sessions in the database 
 */
const handleGetAllSessions = async () => {
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

export const getAllSessions: SessionsGet = async () => {
  try {
    const sessionResponse = await handleGetAllSessions(); 
    return sessionResponse; 
  } 
  catch (statusText) {
    console.log('Error in Sessions GET: ', statusText);
    return null;
  }
};
