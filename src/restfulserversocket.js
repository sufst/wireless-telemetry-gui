export default class RESTfulServerSocket {
    constructor() {
        this.socket = undefined;
        this.lastEpoch = undefined;
    }

    open() {
        let promise = new Promise((resolve, reject) => {
            this.socket = new WebSocket("ws://localhost:8765");

            this.socket.onopen = (event) => {
                console.log("opened");
                resolve();
            }
        });

        return promise;
    }

    requestMetaSensorData() {
        let promise = new Promise((resolve, reject) => {
            this.socket.onmessage = (event) => this.handleSocketResponsePromise(event.data, resolve, reject);
        });

        this.socket.send("GET /meta/sensors?");

        return promise;
    }

    requestSensorData() {
        let promise = new Promise((resolve, reject) => {
            this.socket.onmessage = (event) => this.handleSocketResponsePromise(event.data, resolve, reject);
        });

        this.socket.send(`GET /sensors?timesince=${this.lastEpoch}`);

        return promise;
    }

    handleSocketResponsePromise(data, resolve, reject) {
        const response = JSON.parse(data);
        console.log(response);

        if(response.status === 200) {
            this.lastEpoch = response.epoch;
            resolve(response);
        } else {
            reject(response);
        }
    }
}