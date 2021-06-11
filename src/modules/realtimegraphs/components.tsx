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
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Label
} from "recharts";
import type {
    GraphData
} from "./typing";

export const SensorPaperHeaderHideButton = (props: { onChange: (event: any) => void, checked: boolean }) => {
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

export const SensorPaperHeaderTitle = (props: { name: string }) => {
    const classes = useStyles();

    return (
        <Typography variant="h6" className={classes.sensorPaperHeaderTitle}>
            {props.name}
        </Typography >
    );
}

export const SensorLiveValue = (props: { value: number }) => {
    const classes = useStyles();

    return (
        <Typography variant="h3" className={classes.sensorLiveValue}>
            {props.value}
        </Typography >
    );
}

export const SensorGraph = (props: { 
    width: number, 
    data: Array<GraphData>,
    xAxisDomainMin: string, 
    xAxisDomainMax: string, 
    yAxisDomainMin: number,
    yAxisDomainMax: number,
    yAxisLabel: string
 }) => {
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
                bottom: 30
            }}
            >
            <CartesianGrid strokeDasharray="4 4 4 " />
            <XAxis dataKey="time" domain={[props.xAxisDomainMin, props.xAxisDomainMax]} stroke='#d0d0d0'>
                <Label value="Time (s)" offset={5} position="bottom" className={classes.sensorGraph}/>
            </XAxis>
            <YAxis domain={[props.yAxisDomainMin, props.yAxisDomainMax]} stroke='#d0d0d0'>
                <Label value={props.yAxisLabel} offset={-10} position="insideLeft" angle={-90} className={classes.sensorGraph}/>
            </YAxis>
            <Line
                type="monotone"
                isAnimationActive={false}
                dataKey="value"
                stroke="#66b2ff"
                strokeWidth={3}
                dot={false}
            />
        </LineChart>
    );
}