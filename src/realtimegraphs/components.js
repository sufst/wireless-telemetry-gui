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
import { 
    useStyles
} from "./styles"
import { 
    Switch, 
    FormControlLabel, 
    Typography 
} from '@material-ui/core';
import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Label
} from "recharts";

export function SensorPaperHeaderHideButton(props) {
    const classes = useStyles();

    return (
        <FormControlLabel control={
            <Switch checked={props.checked} onChange={props.onChange} color="primary"/>
        }             
        label="Show"
        className={classes.sensorPaperHeaderButton}
        />
    );
}

export function SensorPaperHeaderTitle(props) {
    const classes = useStyles();

    return (
        <Typography variant="h6" className={classes.sensorPaperHeaderTitle}>
            {props.name}
        </Typography >
    );
}

export function SensorLiveValue(props) {
    const classes = useStyles();

    return (
        <Typography variant="h3" className={classes.sensorLiveValue}>
            {props.value}
    </Typography >
    );
}

export function SensorGraph(props) {
    const classes = useStyles();

    return (
        <LineChart
            width={props.width}
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
            <XAxis dataKey="time" domain={[props.xAxisDomainMin, props.xAxisDomainMax]} >
            {/* <XAxis dataKey="time"> */}
                <Label value="Time (s)" offset={0} position="insideBottom" className={classes.sensorGraph}/>
            </XAxis>
            <YAxis domain={[props.yAxisDomainMin, props.yAxisDomainMax]} >
                <Label value={props.yAxisLabel} offset={0} position="insideLeft" angle={-90} className={classes.sensorGraph}/>
            </YAxis>
            <Line
                type="monotone"
                isAnimationActive={false}
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
            />
        </LineChart>
    );
}

export function GroupPaperHeaderHideButton(props) {
    const classes = useStyles();

    return (
        <FormControlLabel control={
            <Switch checked={props.checked} onChange={props.onChange} color="primary"/>
        }             
        label="Show"
        className={classes.groupPaperHeaderButton}
        />
    );
}

export function GroupPaperHeaderTitle(props) {
    const classes = useStyles();

    return (
        <Typography variant="h3" className={classes.groupPaperHeaderTitle}>
            {props.name}
        </Typography >
    );
}