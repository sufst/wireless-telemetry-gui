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

import "./app.css";
import React, { useEffect, useState } from 'react';
import AppHeader from "./appheader";
import AppRealTimeGraphs from "./apprealtimegraphs";
import AppSignIn from "./appsignin";
import { getUserData } from "./backend"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

function Dash(props) {
    return (
        <div className="Dash">
            <AppHeader />,
            <AppRealTimeGraphs graphData={props.graphData}/>  
        </div>
    );
}

export default function App(props) {
    const [userData, setUserData] = useState(undefined);
    useEffect(() => {
        if (userData !== undefined) {
            console.log(userData);
        }
    });

    const [signedIn, setSignedIn] = useState(false);

    // onSensorsResponse(response) {
    //     let newSensorGroupData = this.sensorGroupData;
    //     let newGraphsData = this.state.graphData;

    //     // Parse the result groups and sensors to re-built our sensor data.
    //     for (let group in response.result) {
    //         if (newSensorGroupData[group] === undefined) {
    //             newSensorGroupData[group] = {};
    //         } else {
    //             for (let sensor in response.result[group]) {
    //                 if (newSensorGroupData[group][sensor] === undefined) {
    //                     newSensorGroupData[group][sensor] = [];
    //                 } else {
    //                     const trimmedData = this.trimOldData(this.sensorGroupData[group][sensor], this.expireTimeS + 1.0); 
    //                     const combinedData = [...trimmedData, ...response.result[group][sensor]];                               
    //                     newSensorGroupData[group][sensor] = combinedData;
    //                 }
    //                 const graphData = this.convertDataEpochTimesToGraphTimes(newSensorGroupData[group][sensor]);
    //                 newGraphsData[sensor] = {
    //                     data: graphData,
    //                     min: this.graphMetaData[group][sensor].min,
    //                     max: this.graphMetaData[group][sensor].max
    //                 };
    //             }
    //         }
    //     }

    //     this.sensorGroupData = newSensorGroupData;
    //     this.setState({graphData: newGraphsData});
    // }

    // trimOldData(data, expireSeconds) {
    //     let dataNew = []
    //     let epoch = new Date().valueOf() / 1000.0;

    //     for (const entry in data) {
    //         if (data[entry].time >= epoch - expireSeconds) {
    //             dataNew.push(data[entry]);
                
    //         }
    //     }

    //     return dataNew;
    // }

    // convertDataEpochTimesToGraphTimes(data) {
    //     let newData = [];
    //     const now = new Date().valueOf() / 1000;

    //     data.forEach(entry => {
    //         newData.push({time: 0.0 - (now - entry.time), value: entry.value});
    //     });

    //     return newData;
    // }

    function onSignIn(username) {
        console.log(username + "signed in");

        getUserData(username)
        .then((data) => setUserData(data))
        .catch((error) => console.error(error));

        setSignedIn(true);
    }

    return (
        <div className="App">
            <Router>
                <Switch>
                <Route path="/" exact>
                    { signedIn ? <Redirect to="/dashboard" /> : <Redirect to="/signin" /> }
                </Route>
                <Route path="/signin">
                    { signedIn ? <Redirect to="/dashboard" /> : <AppSignIn onAuthUser={(username) => onSignIn(username)} /> }
                </Route>
                <Route path="/dashboard" exact>
                    { signedIn ? <div>404 Not found</div> : <Redirect to="/signin" /> }
                </Route>
                <Route path="*">
                    <div>404 Not found</div>
                </Route>
                </Switch>
            </Router>
        </div>
    );
}