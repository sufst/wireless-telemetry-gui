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

import React, { useMemo } from 'react';
import { v4 } from 'uuid';
import { useStyles } from './styles';
import { Box, Grid, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import type { RootState } from "redux/store";

const SensorPaperContainer: React.FC<{name: string, groupName: string}> = (props) => {
    const classes = useStyles();

    const sensorsSelector = (state: RootState) => state.sensors.sensors[props.name];
    const sensor = useSelector(sensorsSelector);

    const data = sensor?.data ?? [];
    const lastValue = Number(data[data?.length - 1]?.value);
    const sensorName = sensor?.meta?.name.replace(props.groupName + " ", "");

    return (
        <Grid item xs={12} sm={6} lg={3} xl={2}>
            <Box className={classes.sensorBox}>
                <div>
                    <div className={classes.sensorNameText}>{sensorName}:</div>
                    <div className={classes.sensorValueText}><span className={classes.sensorLastValue}>{lastValue.toPrecision(4)}</span> {sensor?.meta?.units}</div>
                </div>
            </Box>
        </Grid>
    )
}

const RealtimeSensorsGroupContainer: React.FC<{name: string}> = (props) => {
    const selectSensors = (state: RootState) => state.sensors.groups[props.name];
    const sensors = useSelector(selectSensors);
    const classes = useStyles();

    // See modules index.js for explaination of why useMemo is used.
    const sensorContainers = useMemo(() => {

        const containers = sensors.map((x: string) => {
            return (
                <SensorPaperContainer key={v4()} name={x} groupName={props.name} />
            );
        });
        return containers;
    }, [sensors, props.name]);

    return (
        <>
            <Paper className={classes.rootPaper}>
                <p className={classes.headingText}>{props.name} Sensors</p>
                <Grid container alignItems="center" key={v4()} spacing={2}>
                    {sensorContainers}
                </Grid>
            </Paper>
        </>
    );
}

export default RealtimeSensorsGroupContainer;
