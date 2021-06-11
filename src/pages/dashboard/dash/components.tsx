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
import { CheckCircleOutline } from "@material-ui/icons";
import { useCallback, useEffect, useRef } from "react";
import { SensorData } from "redux/typing";
import { useStyles } from "./styles"

export type DashStatusItemColor = 'grey' | 'red' | 'green' | 'orange'
export type DashStatusItemText = 'IDLE' | 'INACTIVE' | 'ACTIVE' | 'CONNECTED' | 'DISCONNECTED' | 'LOW' | 'HEALTHY'

export const DashStatusItem = (props: { name: string, data: SensorData[] }) => {
    const classes = useStyles(); 

    const { name, data } = props; 
    const lastValue = data[data.length-1].value; 

    let background: DashStatusItemColor = 'grey'; 
    let text: DashStatusItemText = 'INACTIVE'; 

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
        <Grid item xs={3} className={classes.item}>
            <Box className={classes.box} style={{
                backgroundColor: background
            }}>
                <span>{props.name}: {text}</span>
            </Box>
        </Grid>
    )
}