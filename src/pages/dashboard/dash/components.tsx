/*
    Southampton University Formula Student Team
    Copyright (C) 2021 SUFST

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

import { Box, Grid } from "@material-ui/core"
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { Sensor, SensorData, SensorsState } from "redux/typing";
import { useStyles } from "./styles"
import { DashStatusItemColor, DashStatusItemText } from "./typing";

export const DashStatusItem = (props: { name: string, data: SensorData[] }) => {
    const classes = useStyles(); 

    const name = props.name; 
    const data = props.data ?? [];
    
    const lastValue = data[data?.length-1]?.value; 

    let background: DashStatusItemColor = 'rgba(0, 0, 0, 0.5)'
    let text: DashStatusItemText = ' '; 

    const checkECU = () => {
        if (lastValue === 1) {
            text = 'CONNECTED';
            background = 'green';
        } 
        else if (lastValue === 0) {
            text = 'DISCONNECTED';
            background = 'red';
        }
    };

    const checkEngine = () => {
        if (lastValue === 1) {
            text = 'INACTIVE';
            background = 'red';
        } 
        else if (lastValue === 2) {
            text = 'IDLE';
            background = 'orange';
        } 
        else if (lastValue === 3) {
            text = 'ACTIVE';
            background = 'green';
        }
    }

    const checkBattery = () => {
        if (lastValue === 1) {
            text = 'DISCONNECTED';
            background = 'grey';
        } 
        else if (lastValue === 2) {
            text = 'LOW';
            background = 'red';
        } 
        else if (lastValue === 3) {
            text = 'HEALTHY';
            background = 'green';
        }
    }

    const checkLogging = () => {
        if (lastValue === 0) {
            text = 'INACTIVE';
            background = 'red';
        } 
        else if (lastValue === 1) {
            text = 'ACTIVE';
            background = 'green';
        }
    }

    if (name === 'ECU') {
        checkECU(); 
    } 
    else if (name === 'ENGINE') {
        checkEngine(); 
    }
    else if (name === 'BATTERY') {
        checkBattery(); 
    }
    else if (name === 'LOGGING') {
        checkLogging(); 
    }
    
    return (
        <Grid item lg={3} xs={12} sm={6} className={classes.item}>
            <Box className={classes.box} style={{
                backgroundColor: background
            }}>
                <span>{props.name}: <span className={classes.status}>{text}</span></span>
            </Box>
        </Grid>
    )
}

export const CurrentTime = () => {

    let [time, setTime] = useState(new Date()); 

    const classes = useStyles(); 

    useEffect(() => {
        let timer = setInterval(() => setTime(new Date()), 1000)
        
        return function cleanup() {
            clearInterval(timer);
        }
    })


    return (
        <p className={classes.currentTimeText}>Current Time: <span className={classes.time}>{time.toLocaleTimeString()}</span></p>
    )
}

export const DashSensorsItem = (props: { name: string }) => {
    const classes = useStyles(); 

    const sensorsSelector = (state: RootState) => state.sensors.sensors[props.name]; 
    const sensor = useSelector(sensorsSelector); 

    const data = sensor.data; 
    const lastValue = data[data.length-1].value; 
    
    return (
        <Grid item xs={2}>
            <Box className={classes.sensorBox}>
                <div>{sensor.meta.name}:<br/><span className={classes.sensorLastValue}>{lastValue} </span>{sensor.meta.units}</div>
            </Box>
        </Grid>
    )
}

export const DashSensors = () => {

    const classes = useStyles(); 

    const names = ['rpm', 'water_temp_c', 'tps_perc', 'battery_mv', 'speed_kph', 'fuel_flow']
    
    return (
        <>
            <h2 className={classes.sensorsText}>Sensors</h2>
            <Grid container className={classes.gridContainer} spacing={2}>
                <DashSensorsItem name={names[0]}/>
                <DashSensorsItem name={names[1]}/>
                <DashSensorsItem name={names[2]}/>
                <DashSensorsItem name={names[3]}/>
                <DashSensorsItem name={names[4]}/>
                <DashSensorsItem name={names[5]}/>
            </Grid>
        </>
    )
}