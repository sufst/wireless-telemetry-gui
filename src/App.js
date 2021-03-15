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

import "./App.css"
import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";


class AppHeader extends React.Component {
    render() {
        return (
            <div className="AppHeader">
                <h1>SUFST Amazing Web App of Doom</h1> 
                <hr></hr>
                <p> SUFST Amazing Web App of Doom is licensed under the GNU General Public License v3.0. </p>
                <hr></hr>
            </div>
        );
    }
}

class AppRealTimeGraphs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //TODO: enable buttons for each graph type.
            graphData: props.graphData,
            numberGraphsPerRow: 2
        };
        
        this.graphEndS = -2.0;
        this.graphStartS = -0.0;
    }

    render() {
         // Check if the graph data is empty (before socket request of sensor data occurs)
         if (Object.keys(this.state.graphData).length === 0)
         {
             return (
                 <div className="AppRealTimeGraphs">
                     <h2>No Graphs Yet :(</h2>
                 </div>
             );
         } else {
             return (
                 <div className="AppRealTimeGraphs">
                    <h2>GRAPHS!!! :D</h2>
                    <form>
                        <p>Enter number of graphs per row:</p>
                        <input type="number" onChange={(event) => this.setState({numberGraphsPerRow: event.target.value})}/>
                    </form>
                    {this.getGraphTable()}
                 </div>
             );
         }
    }

    getGraphTable() {
         let tableRowsMapping = [];
        let rows = []

        let rowBuffer = []
        // Build the mapping of graph to rows
        for (let entry in this.state.graphData) {

            rowBuffer.push(entry);

            if (rowBuffer.length >= this.state.numberGraphsPerRow) {
                tableRowsMapping.push(rowBuffer);
                rowBuffer = [];
            }
        }

        tableRowsMapping.forEach((row_map, index) => 
            rows.push(this.getGraphTableRowEntry(row_map, index))
            );

        return (
            <table>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }

    getGraphTableRowEntry(row_map, index) {
        let row = [];
        
        row_map.forEach((entry, number) => {
            const graph = this.state.graphData[entry];

            row.push(
                <td key={"td_" + number}>
                    <this.Graph title={entry} timeEndS={this.graphEndS} timeStartS={this.graphStartS} min={graph.min} max={graph.max} graphData={graph.data}/>
                </td>);
        });

        return (
            <tr key={"tr_" + index}>
                {row}
            </tr>
        );
    }

    Graph(props) {
        return (
            <>
                <h2>{props.title}</h2>
                <LineChart
                    width={800}
                    height={400}
                    data={props.graphData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" type="number" domain={[props.timeEndS, props.timeStartS]} />
                    <YAxis domain={[props.min, props.max]}/>
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        isAnimationActive={false}
                        dataKey="value"
                        stroke="#8884d8"
                        strokeWidth={2}
                    />
                </LineChart>
            </>
        );
    }
}

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            socketInterval: undefined,
            graphData: {}
        };

        this.socket = new WebSocket("ws://localhost:8765");
        this.lastEpoch = new Date().valueOf() / 1000;
        this.graphMetaData = {};
        this.sensorGroupData = {};
        this.expireTimeS = 2.0;

        this.socket.onopen = (event) => {
            let onSocketResponsePromise = new Promise((resolve, reject) => {
                this.socket.onmessage = (event) => this.handleSocketResponsePromise(event.data, resolve, reject);
            });

            this.socket.send("GET /meta/sensors?");
            onSocketResponsePromise.then((response) => this.handleRestMetaResponse(response));
        }
    }

    handleSocketResponsePromise(data, resolve, reject) {
        const response = JSON.parse(data);
        console.log(response);

        if(response.status === 200) {
            resolve(response);
        } else {
            reject(response);
        }
    }

    handleRestMetaResponse(response) {
        // Save all the meta data for graph usage on sensor response.
        for (let group in response.result) {
            if (this.graphMetaData[group] === undefined) {
                this.graphMetaData[group] = {};
            }
            for (let sensor in response.result[group]) {
                this.graphMetaData[group][sensor] = response.result[group][sensor];
            }
        }

        this.handleRestSensorRequest();
    }

    handleRestSensorRequest() {
        let onSocketResponsePromise = new Promise((resolve, reject) => {
            this.socket.onmessage = (event) => this.handleSocketResponsePromise(event.data, resolve, reject);
        });

        this.socket.send(`GET /sensors?timesince=${this.lastEpoch}`);
        onSocketResponsePromise.then((response) => this.handleRestSensorResponsePromise(response));
    }

    handleRestSensorResponsePromise(response) {
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

        this.lastEpoch = response.epoch;
        this.sensorGroupData = newSensorGroupData;
        this.setState({graphData: newGraphsData});

        // Make another sensor request.
        this.handleRestSensorRequest();
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

    render() {
        return (
            <span className="App">
                <AppHeader />
                <AppRealTimeGraphs graphData={this.state.graphData}/>
            </span>
        );
    }
}