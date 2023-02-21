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
import { SessionDetailGet, SessionCreate, SessionCreateFields, SessionsGet, SessionStop } from "types/api/api";

/**
 * Creating new sessions
 * @param accessToken JWT authentication token
 * @param name Name for new session
 * @param fields Object housing the session metadata and sensors to be saved.
 */
const handleCreateSession: SessionCreate = async (
  accessToken,
  name,
  fields
) => {
  const response = await fetch(`http://${url}/sessions/${name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

// NEEDS MOVED TO APPROPRIATE TYPES FILE
type s = (
  accessToken: string,
  name: string,
  sessionMeta: object,
  sessionSensors: string[]
) => Promise<SessionCreate | null>;

export const createSession: s = async (
  accessToken: string,
  name: string,
  sessionMeta: object,
  sessionSensors: string[]
) => {
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
};

/**
 * Stopping a currently alive session
 * @param name Name of session to be stopped.
 * @param accessToken JWT authentication token
 */
const handleSessionStop: SessionStop = async (
  name: string,
  accessToken: string
) => {
  const response = await fetch(`http://${url}/sessions/${name}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({
      status: "dead",
    }),
  });

  if(!response.ok) {
    throw response.statusText;
  }

  return response;
};

export const stopSession: SessionStop = async (name, token) => {
  try {
    const response = await handleSessionStop(name, token);
    return response;
  } catch (statusText) {
    console.log("Error Stopping session: ", statusText);
    return null;
  }
};

/**
 * Getting all the sessions in the database
 */
const handleGetAllSessions: SessionsGet = async () => {
  const response = await fetch(`http://${url}/sessions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if(!response.ok) {
    throw response.statusText;
  }

  const data = await response.json();
  return data;
};

export const getAllSessions: SessionsGet = async () => {
  try {
    const sessionResponse = await handleGetAllSessions();
    return sessionResponse;
  } catch (statusText) {
    console.log("Error in Sessions GET: ", statusText);
    return null;
  }
};

/**
 * Getting details of one of the sessions in the database 
 */
const handleGetSessionDetail = async (name: String, accessToken: string) => {
  const response = await fetch(`http://${url}/sessions/${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/zip",
      Authorization: "Bearer " + accessToken,
    },
  })

  if (!response.ok) {
    throw response.statusText;
  }

  const data = await response.blob();
  return data;
}

export const getSessionDetail: SessionDetailGet = async (name: string, token: string) => {
  try {
    const sessionResponse = await handleGetSessionDetail(name, token);
    return sessionResponse;
  }
  catch (statusText) {
    console.log('Error in Session Detail GET: ', statusText);
    return null;
  }
};
