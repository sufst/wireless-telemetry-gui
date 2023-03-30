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
import {
  SessionDetailGet,
  SessionCreate,
  SessionCreateFields,
  SessionsGet,
  SessionStop,
  SessionsGetResponse,
  HandleSessionsGet,
  HandleSessionsGetPromise,
} from "types/api/api";

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
  try {
    const response = await fetch(`http://${url}/sessions/${name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        meta: fields.sessionMetadata,
        sensors: fields.sessionSensors,
      }),
    });

    if (!response.ok) {
      throw response.statusText;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("offline");
  }
};

// NEEDS MOVED TO APPROPRIATE TYPES FILE
type SessionCreatePromise = (
  accessToken: string,
  name: string,
  sessionMeta: object,
  sessionSensors: string[]
) => Promise<[SessionCreate | null, boolean]>;

export const createSession: SessionCreatePromise = async (
  accessToken: string,
  name: string,
  sessionMeta: object,
  sessionSensors: string[]
) => {
  const fields: SessionCreateFields = {
    sessionMetadata: sessionMeta,
    sessionSensors: sessionSensors,
  };

  try {
    const response = await handleCreateSession(accessToken, name, fields);
    return [response, false];
  } catch (error: any) {
    console.log("Error creating new session: ", error);
    return [null, error.message === "offline"];
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
  try {
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

    if (!response.ok) {
      throw response.statusText;
    }

    return response;
  } catch (error) {
    throw new Error("offline");
  }
};

export const stopSession: SessionStop = async (name, token) => {
  try {
    const response = await handleSessionStop(name, token);
    return [response, false];
  } catch (error: any) {
    console.error("Error Stopping session: ", error);
    return [null, error.message === "offline"];
  }
};

/**
 * Getting all the sessions in the database
 */
const handleGetAllSessions: HandleSessionsGetPromise  = async () => {
  try {
    const response = await fetch(`http://${url}/sessions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw response.statusText;
    }

    const data: SessionsGetResponse = await response.json();
    return data;
  } catch (error) {
    throw new Error("offline");
  }
};

export const getAllSessions: SessionsGet = async () => {
  try {
    const sessionResponse: HandleSessionsGet = await handleGetAllSessions();
    return [sessionResponse, false];
  } catch (error: any) {
    console.error("Error in Sessions GET: ", error);
    return [null, error.message === "offline"];
  }
};

/**
 * Getting details of one of the sessions in the database
 */
const handleGetSessionDetail = async (name: string, accessToken: string) => {
  try {
    const response = await fetch(`http://${url}/sessions/${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/zip",
        Authorization: "Bearer " + accessToken,
      },
    });

    if (!response.ok) {
      throw response.statusText;
    }

    const data = await response.blob();
    return data;
  } catch (error) {
    throw new Error("offline");
  }
};

export const getSessionDetail: SessionDetailGet = async (
  name: string,
  token: string
) => {
  try {
    const sessionResponse = await handleGetSessionDetail(name, token);
    return [sessionResponse, false];
  } catch (error: any) {
    console.error("Error in Session Detail GET: ", error);
    return [null, error.message === "offline"];
  }
};
