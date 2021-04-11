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
import React, {
    useCallback, 
    useRef, 
    memo, 
    useMemo 
} from 'react';
import { 
    useSensorConfigDispatch,
    useSensor,
    useSensorData,
    useGroup,
    useGroupSensors
} from "../store/sensors";
import {
    v4 
}from 'uuid';
import { 
    trimData, 
    convertDataToGraphData 
} from "./utils";
import {
    useStyles 
}from "./styles";
import { 
    Grid, 
    Divider, 
    Paper
} from '@material-ui/core';
import { 
    SensorPaperHeaderHideButton, 
    SensorPaperHeaderTitle, 
    SensorGraph, 
    SensorLiveValue
} from "./components";

function SensorPaperHeaderContainer(props) {
    const sensor = useSensor(props.group, props.name);
    const dispatch = useSensorConfigDispatch();

    const onChange = useCallback((event) => {
        event.preventDefault();
        dispatch({type: "update_sensor", group: props.group, sensor: props.name, key: "isDisplay", value: !sensor.isDisplay});
    }, [dispatch, props.group, props.name, sensor.isDisplay]);

    const HeaderTitle = memo(SensorPaperHeaderTitle);
    const HeaderButton = memo(SensorPaperHeaderHideButton);

    return (
        <Grid container alignItems="center" key={v4()} spacing={1}>
            <Grid item key={v4()} xs={6}>
                <HeaderTitle name={sensor.name} />
            </Grid>
            <Grid item key={v4()} xs={6}>
                <HeaderButton onChange={onChange} checked={sensor.isDisplay}/>
            </Grid>
        </Grid>
    );
}

function SensorGraphContainer(props) {
    const sensor = useSensor(props.group, props.name);
    const inData = useSensorData(props.name);
    const graphDataRef = useRef([]);

    graphDataRef.current = convertDataToGraphData(trimData([...graphDataRef.current, ...inData], sensor.timeEndS));

    const LiveValue = memo(SensorLiveValue);
    const Graph = memo(SensorGraph);

    const date = new Date();
    const timeXStart = date.toTimeString().split(" ")[0] + ":" + date.getMilliseconds();
    const dateEnd = new Date((date.valueOf() / 1000) + sensor.timeEndS);
    const timeXEnd = dateEnd.toTimeString().split(" ")[0] + ":" + dateEnd.getMilliseconds();

    return (
        <Grid container alignItems="center" key={v4()} spacing={1}>
            <Grid item key={v4()} xs={2}>
                {graphDataRef.current.length > 0 ? <LiveValue key={v4()} value={Math.round(graphDataRef.current[graphDataRef.current.length - 1].value)}/> : <></>}
            </Grid>
            <Grid item key={v4()} xs={10}>
                <Graph 
                    name={props.name} 
                    data={graphDataRef.current} 
                    width={700}
                    xAxisDomainMin={timeXStart}
                    xAxisDomainMax={timeXEnd}
                    yAxisDomainMin={sensor.min}
                    yAxisDomainMax={sensor.max}
                    yAxisLabel={sensor.units}
                />
            </Grid>
        </Grid>

    );
}

function SensorPaperContainer(props) {
    const sensor = useSensor(props.group, props.name);

    const classes = useStyles();

    return (
        <Paper className={classes.sensorPaper}>
            <Grid container alignItems="center" key={v4()} spacing={1}>
                <Grid item key={v4()} xs={12}>
                    <SensorPaperHeaderContainer key={v4()} name={props.name} group={props.group}/>
                    <Divider light />
                </Grid>
                <Grid item key={v4()} xs={12}>
                    {sensor.isDisplay ? <SensorGraphContainer key={v4()} group={props.group} name={props.name}/> : <></>}
                </Grid>
            </Grid>
        </Paper>
    );
}

export function GroupContainer(props) {
    const classes = useStyles();
    const group = useGroup( props.name);
    const groupSensors = useGroupSensors(props.name);

    // See modules index.js for explaination of why useMemo is used.
    const sensorContainers = useMemo(() => {


        const containers = Object.keys(groupSensors).map(x => 
        {
            return (<Grid item key={v4()} xs={12}>
                    <SensorPaperContainer key={v4()} group={props.name} name={x}/>
                    </Grid>
            );
        });
        return containers;
    }, [groupSensors, props.name]);

    return (
        <Grid container alignItems="center" key={v4()}>
            {sensorContainers}
        </Grid>
    );
}
