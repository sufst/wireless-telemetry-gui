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

import { memo, useMemo } from 'react';
import { v4 } from 'uuid';
import { useStyles } from "./styles";
import {  Grid, Paper } from '@material-ui/core';
import { SensorPaperHeaderTitle, SensorLiveValue } from "./components";
import { useSelector } from 'react-redux';
import type { RootState } from "redux/store";

const SensorPaperHeaderContainer = (props: { name: string }) => {
    const selectSensorMeta = (state: RootState) => state.sensors.sensors[props.name].meta;
    const sensor = useSelector(selectSensorMeta);

    const HeaderTitle = memo(SensorPaperHeaderTitle);

    return (
        <Grid container alignItems="center" key={v4()} spacing={1}>
            <Grid item key={v4()} xs={6}>
                <HeaderTitle name={sensor.name} />
            </Grid>
        </Grid>
    );
}

const SensorGraphContainer = (props: { name: string }) => {
    const selectSensorData = (state: RootState) => state.sensors.sensors[props.name].data;

    const inData = useSelector(selectSensorData); 

    const LiveValue = memo(SensorLiveValue);

    const classes = useStyles();

    return (
        <Grid container alignItems="center" key={v4()} spacing={1} className={classes.sensorGraphContainerRoot}>
            <Grid item key={v4()} xs={2}>
                <LiveValue key={v4()} value={inData[inData.length - 1].value}/>
            </Grid>
        </Grid>

    );
}

const SensorPaperContainer = (props: { name: string }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.sensorLiveValue}>
            <Grid container alignItems="center" key={v4()} spacing={1}>
                <Grid item key={v4()} xs={12}>
                    <SensorPaperHeaderContainer key={v4()} name={props.name}/>
                    {/* <Divider light /> */}
                </Grid>
                <Grid item key={v4()} xs={12}>
                    <SensorGraphContainer key={v4()} name={props.name}/>
                </Grid>
            </Grid>
        </Paper>
    );
}

const RealtimeSensorsGroupContainer = (props: { name: string }) => {
    const selectSensors = (state: RootState) => state.sensors.groups[props.name];
    const sensors = useSelector(selectSensors); 

    // See modules index.js for explaination of why useMemo is used.
    const sensorContainers = useMemo(() => {

        const containers = sensors.map((x: string) => 
        {
            return (<Grid item key={v4()} xs={12}>
                    <SensorPaperContainer key={v4()} name={x}/>
                    </Grid>
            );
        });
        return containers;
    }, [sensors]);

    return (
        <Grid container alignItems="center" key={v4()}>
            {sensorContainers}
        </Grid>
    );
}

export default RealtimeSensorsGroupContainer; 
