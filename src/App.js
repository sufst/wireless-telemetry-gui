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

function Chart(props) {
    return (
        <LineChart
        width={800}
        height={400}
        data={props.data}
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
    );
}

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sensorGroupData: {},
            socketInterval: undefined,
            graphTable: []
        };

        this.socket = new WebSocket("ws://localhost:8765");
        this.lastEpoch = new Date().valueOf() / 1000;
        this.onResponse = undefined;
        this.graphMetaData = {};
        this.socketIntervalS = 0.1;
        this.expireTimeS = 3.0;
        this.graphEndS = -4.0;
        this.graphStartS = -0.5;

        this.socket.onopen = (event) => {
            this.handleRestMetaRequest();
        }

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (this.onResponse !== undefined) {
                this.onResponse(data);

                // Reset the response object for next request.
                this.onResponse = undefined;
            }
        }
    }

    handleRestMetaRequest() {
        // Check to ensure there is no request active.
        if (this.onResponse === undefined) {
            this.socket.send("GET /meta/sensors?");
            this.onResponse = this.handleRestMetaResponse;
        }
    }

    handleRestMetaResponse(response) {
        // Save all the meta data for graph usage on sensor response.
        if (response.status === 200) {
            if (response.result !== undefined) {
                for (let group in response.result) {
                    if (this.graphMetaData[group] === undefined) {
                        this.graphMetaData[group] = {};
                    }
                    for (let sensor in response.result[group]) {
                        this.graphMetaData[group][sensor] = response.result[group][sensor];
                    }
                }
            }
        }

        this.setState({socketInterval: setInterval(() => this.handleRestSensorRequest(), this.socketIntervalS * 1000)}); 
    }

    handleRestSensorRequest() {
        // Check to ensure there is no request active.
        if (this.onResponse === undefined) {
            this.socket.send(`GET /sensors?timesince=${this.lastEpoch}`);
            this.onResponse = this.handleRestSensorResponse;
        }
    }

    handleRestSensorResponse(response) {
        let newSensorGroupData = this.state.sensorGroupData;
        let newGraphsTable = this.state.graphTable.splice();

        // Parse the result groups and sensors to re-built our sensor data.
        if (response.status === 200) {
            if (response.result !== undefined) {
                for (let group in response.result) {
                    if (newSensorGroupData[group] === undefined) {
                        newSensorGroupData[group] = {};
                    } else {
                        for (let sensor in response.result[group]) {
                            if (newSensorGroupData[group][sensor] === undefined) {
                                newSensorGroupData[group][sensor] = [];
                            } else {
                                const trimmedData = this.trimOldData(this.state.sensorGroupData[group][sensor], this.expireTimeS + 1.0); 
                                const combinedData = [...trimmedData, ...response.result[group][sensor]];                               
                                newSensorGroupData[group][sensor] = combinedData;
                            }
                            const graphData = this.convertDataEpochTimesToGraphTimes(newSensorGroupData[group][sensor]);
                            newGraphsTable.push({"key": sensor, "graph": 
                                <Chart 
                                    data={graphData} 
                                    timeEndS={this.graphEndS}
                                    timeStartS={this.graphStartS}
                                    min={this.graphMetaData[group][sensor].min}
                                    max={this.graphMetaData[group][sensor].max}
                                />});
                        }
                    }
                }

                this.lastEpoch = response.epoch;
                this.setState({graphTable: newGraphsTable, sensorGroupData: newSensorGroupData});
            }
        }
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

    renderGraphTableRows() {
        const tableData = this.state.graphTable;

        if (!tableData) return null;

        let result = [];

        tableData.forEach(entry => {
            result.push(
            <tr key={entry.key}>
                <td>
                    {entry.key}
                    {entry.graph}
                </td>
            </tr>
            )
        });
        
        return result;
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                ALL THE GRAPHS!!
                            </th>
                        </tr>
                    </thead>
                <tbody>
                    {this.renderGraphTableRows()}
                </tbody>
                </table>
            </div>
        );
    }
}