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

import { 
    io 
} from "socket.io-client";
import { URL } from "config";

let accessToken = undefined;
const url = URL
export let sio = undefined;
const namespace = "car";

export function loginUser(username, password) {
    return new Promise((resolve, reject) => 
    fetch(`http://${url}/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then((response) => {
        if (!response.ok) {
        throw response.statusText;
        }
        return response.json();
    })
    .then((data) => {
        accessToken = data.access_token

        sio = io(`ws://${url}/${namespace}`, {
            reconnectionDelayMax: 10000,
            extraHeaders: {
                "Authorization": "Bearer " + accessToken
            }
        })

        resolve()
    })
    .catch((error) => reject(error)));
}

export function createUser(username, password) {
    return new Promise((resolve, reject) => 
    fetch(`http://${url}/user`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
            // Optional meta fields.
            likes_beans: true
        })
    })
    .then((response) => resolve(response))
    .catch((error) => reject(error)));
}

export function listUserMeta() {
    return new Promise((resolve, reject) => 
    fetch(`http://${url}/user`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + accessToken,
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw response.statusText;
        }
        return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => reject(error)));
}

export function createSession(name, sensors) {
    return new Promise((resolve, reject) => 
    fetch(`http://${url}/session`, {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            sensors: sensors  
        })
    })
    .then((response) => {
        if (!response.ok) {
            throw response.statusText;
        }
        return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => reject(error)));
}

export function startSession(name) {
    return new Promise((resolve, reject) => 
    fetch(`http://${url}/session/${name}`, {
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            start: true
        })
    })
    .then((response) => {
        if (!response.ok) {
            throw response.statusText;
        }
        return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => reject(error)));
}

export function endSession(name) {
    return new Promise((resolve, reject) => 
    fetch(`http://${url}/session/${name}`, {
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            end: true
        })
    })
    .then((response) => {
        if (!response.ok) {
            throw response.statusText;
        }
        return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => reject(error)));
}

export function listSessions() {
    return new Promise((resolve, reject) => 
    fetch(`http://${url}/session`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw response.statusText;
        }
        return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => reject(error)));
}

export function getSession(name) {
    return new Promise((resolve, reject) => 
    fetch(`http://${url}/session/${name}`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw response.statusText;
        }
        return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => reject(error)));
}
