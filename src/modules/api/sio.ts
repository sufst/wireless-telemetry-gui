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
import { 
    io, 
    Socket 
} from "socket.io-client";
import type {
    SioConnect
} from "./typing";

let sio: Socket;

export const connectSio: SioConnect = (accessToken, onMeta, onData) => {
    sio = io(`ws://${url}/car`, {
        reconnectionDelayMax: 10000,
        extraHeaders: {
            "Authorization": "Bearer " + accessToken
        }
    })

    sio.on("connect", () => {
        console.log("Sio connected")
    });

    sio.on("meta", (message: string) => {
        const meta = JSON.parse(message);
        console.log(meta);
        onMeta(meta);
     });

     sio.on("data", (message: string) => {
        const data = JSON.parse(message);
        console.log(data);
        onData(data)
     });
}