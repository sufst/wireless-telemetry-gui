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

import { useMemo } from 'react';
import { v4 } from 'uuid';
import { useStyles } from "../../pages/dashboard/dash/styles";
import { Box, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import type { RootState } from "redux/store";

const SensorPaperContainer = (props: { name: string }) => {
    const classes = useStyles();

    const sensorsSelector = (state: RootState) => state.sensors.sensors[props.name];
    const sensor = useSelector(sensorsSelector);

    const data = sensor?.data ?? [];
    const lastValue = data[data?.length - 1]?.value;

    return (
        <Grid item xs={12} sm={4} lg={2}>
            <Box className={classes.sensorBox}>
                <div>{sensor?.meta?.name}:<br /><span className={classes.sensorLastValue}>{lastValue} </span>{sensor?.meta?.units}</div>
            </Box>
        </Grid>
    )
}

const RealtimeSensorsGroupContainer = (props: { name: string }) => {
    const selectSensors = (state: RootState) => state.sensors.groups[props.name];
    const sensors = useSelector(selectSensors);

    // See modules index.js for explaination of why useMemo is used.
    const sensorContainers = useMemo(() => {

        const containers = sensors.map((x: string) => {
            return (
                <SensorPaperContainer key={v4()} name={x} />
            );
        });
        return containers;
    }, [sensors]);

    return (
        <Grid container alignItems="center" key={v4()} spacing={2}>
            {sensorContainers}
        </Grid>
    );
}

export default RealtimeSensorsGroupContainer; 
