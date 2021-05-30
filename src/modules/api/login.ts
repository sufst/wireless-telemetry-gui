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
    LoginUser
} from "./typing";

export const loginUser: LoginUser = (username, password) => {    
    return new Promise((resolve, reject) => 
    fetch(`http://${url}/login/${username}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: password
        })
    })
    .then((response) => {
        if (!response.ok) {
            throw response.statusText;
        }
        return response.json();
    })
    .then((data: { access_token: string}) => {     
        resolve(data.access_token)
    })
    .catch((error: Error) => reject(error)));
}