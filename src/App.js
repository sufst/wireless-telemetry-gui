/*
    Southampton University Formula Student Team Amazing Web App of Doom
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

import "./app.css"
import React from "react";
import AppHeader from "./appheader";
import AppRealTimeGraphs from "./apprealtimegraphs";
import AppSignIn from "./appsignin"
import io from "socket.io-client";
import RESTfulBackend from "./restfulbackend"


const socket = io("wss://localhost:5000");

socket.on("connect", () => {
    console.log(socket.id);
    socket.send("Hello over socket io!");
  });

function Dash(props) {
    return (
        <>
            <AppHeader />
            <AppRealTimeGraphs graphData={props.graphData}/>  
        </>
    );
}

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            graphData: {},
            onPage: "signIn"
        };

        this.pages = {
            dash: <Dash graphData={this.state.graphData} />,
            signIn: <AppSignIn onAuthUser={(access_token) => this.onSignInAuthorized(access_token)}/>
        };

        this.graphMetaData = {};
        this.sensorGroupData = {};
        this.expireTimeS = 2.0;

        this.username = undefined;
        this.accessToken = undefined;
        this.restfulBackend = new RESTfulBackend();
    }

    onSensorsMetaResponse(response) {
        // Save all the meta data for graph usage on sensor response.
        for (let group in response.result) {
            if (this.graphMetaData[group] === undefined) {
                this.graphMetaData[group] = {};
            }
            for (let sensor in response.result[group]) {
                this.graphMetaData[group][sensor] = response.result[group][sensor];
            }
        }
    }

    onSensorsResponse(response) {
        let newSensorGroupData = this.sensorGroupData;
        let newGraphsData = this.state.graphData;

        // Parse the result groups and sensors to re-built our sensor data.
        for (let group in response.result) {
            if (newSensorGroupData[group] === undefined) {
                newSensorGroupData[group] = {};
            } else {
                for (let sensor in response.result[group]) {
                    if (newSensorGroupData[group][sensor] === undefined) {
                        newSensorGroupData[group][sensor] = [];
                    } else {
                        const trimmedData = this.trimOldData(this.sensorGroupData[group][sensor], this.expireTimeS + 1.0); 
                        const combinedData = [...trimmedData, ...response.result[group][sensor]];                               
                        newSensorGroupData[group][sensor] = combinedData;
                    }
                    const graphData = this.convertDataEpochTimesToGraphTimes(newSensorGroupData[group][sensor]);
                    newGraphsData[sensor] = {
                        data: graphData,
                        min: this.graphMetaData[group][sensor].min,
                        max: this.graphMetaData[group][sensor].max
                    };
                }
            }
        }

        this.sensorGroupData = newSensorGroupData;
        this.setState({graphData: newGraphsData});
    }

    trimOldData(data, expireSeconds) {
        let dataNew = []
        let epoch = new Date().valueOf() / 1000.0;

        for (const entry in data) {
            if (data[entry].time >= epoch - expireSeconds) {
                dataNew.push(data[entry]);
                
            }
        }

        return dataNew;
    }

    convertDataEpochTimesToGraphTimes(data) {
        let newData = [];
        const now = new Date().valueOf() / 1000;

        data.forEach(entry => {
            newData.push({time: 0.0 - (now - entry.time), value: entry.value});
        });

        return newData;
    }

    onSignInAuthorized(accessToken) {
        console.log("Sign in access token granted");
        this.accessToken = accessToken;

        this.restfulBackend.getUserData(this.accessToken, this.username)
        .then((data) => console.log(data))
        .catch((error) => console.error(error));

        this.setState({onPage: "dash"});
    }

    render() {
        return this.pages[this.state.onPage];
    }
}