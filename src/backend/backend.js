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
import { URL } from "../config";

let accessToken = undefined;
// const url = "localhost:5000";
// const url = "nathanrs97devserver.com:5000";
const url = URL
export let sio = undefined;
const namespace = "emulation";

export function logIn(username, password) {
    return new Promise((resolve, reject) => 
    fetch(`http://${url}/login`, {
        method: "POST",
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
        body: JSON.stringify({
            username: username,
            password: password,
            meta: {
                privilege: "basic"
            }
        })
    })
    .then((response) => resolve(response))
    .catch((error) => reject(error)));
}

export function getUserData(username) {
    return new Promise((resolve, reject) => 
    fetch(`http://${url}/user`, {
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
