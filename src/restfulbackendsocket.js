export default class RESTfulBackendSocket {
    constructor() {
        this.socket = undefined;
    }

    open() {
        let promise = new Promise((resolve, reject) => {
            this.socket = new WebSocket("wss://localhost:8767");

            this.socket.onopen = (event) => {
                console.log("opened");
                resolve();
            };

            this.socket.onerror = (error) => {
                reject(error);
            };
        });

        return promise;
    }

    requestUserAuth(username, password) {
        let promise = new Promise((resolve, reject) => {
            this.socket.onmessage = (event) => this.handleSocketResponsePromise(event.data, resolve, reject);
        });

        this.socket.send("GET /auth_user?username=" + username + "&password=" + password );

        return promise;
    }

    requestCreateUser(user_details) {
        let promise = new Promise((resolve, reject) => {
            this.socket.onmessage = (event) => this.handleSocketResponsePromise(event.data, resolve, reject);
        });

        this.socket.send(`POST /users ` + JSON.stringify(user_details));

        return promise;
    }

    handleSocketResponsePromise(data, resolve, reject) {
        const response = JSON.parse(data);

        if(response.status === 200) {
            this.lastEpoch = response.epoch;
            resolve(response);
        } else {
            reject(response);
        }
    }
}