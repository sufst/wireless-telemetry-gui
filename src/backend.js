
import io from "socket.io-client";

let accessToken = undefined;

export function getUserSocketIOSocket(namespace) {
    let socket = new io("wss://sufst.nathanrs97devserver.com:5000" + namespace, {
        reconnectionDelayMax: 10000,
        query: {
            "access_token": accessToken
        }
    });

    return socket;
}

export function logIn(username, password) {
    return new Promise((resolve, reject) => 
    fetch("https://sufst.nathanrs97devserver.com:5000/login", {
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
        resolve()
    })
    .catch((error) => reject(error)));
}

export function createUser(username, password) {
    return new Promise((resolve, reject) => 
    fetch("https://sufst.nathanrs97devserver.com:5000/users/" + username, {
        method: "POST",
        body: JSON.stringify({
            password: password
        })
    })
    .then((response) => resolve(response))
    .catch((error) => reject(error)));
}

export function getUserData(username) {
    return new Promise((resolve, reject) => 
    fetch("https://sufst.nathanrs97devserver.com:5000/users/"+ + username, {
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
