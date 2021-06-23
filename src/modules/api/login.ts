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
import { LoginUser } from "./typing";

const handleLoginUser: LoginUser = async (username, password) => {
    const response = await fetch(`http://${url}/login/${username}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: password
        })
    })

    if(!response.ok) {
        throw response.statusText; 
    } 

    const data = await response.json(); 
    return data;
}

export const loginUser = async (username: string, password: string) => {

    let token = undefined; 
    
    try {
        const data = await handleLoginUser(username, password); 
        token = data.access_token
    } 
    catch(statusCode) {
        console.error('Error Logging in:', statusCode);
    }
    
    return token; 
}
