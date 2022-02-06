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

import { Grid, Paper } from "@material-ui/core";
import { createAlert } from "modules/alert/alert";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "redux/slices/alert";
import { startSession } from "redux/slices/sessions";
import { RootState } from "redux/store";
import { DashStatusItem, CurrentTime, DashSensors, DashSession } from "./components";
import { useStyles } from "./styles";


const Dash = () => {
    const _ecu = 'status_ecu_connected';
    const _engine = 'status_engine';
    const _battery = 'status_battery';
    const _log = 'status_logging';

    const dispatch = useDispatch(); 
    const classes = useStyles(); 

    const ecuSelector = (state: RootState) => state.sensors.sensors[_ecu]?.data;
    const ecuSensorData = useSelector(ecuSelector);

    const engineSelector = (state: RootState) => state.sensors.sensors[_engine]?.data;
    const engineSensorData = useSelector(engineSelector);

    const batterySelector = (state: RootState) => state.sensors.sensors[_battery]?.data;
    const batterySensorData = useSelector(batterySelector);

    const loggingSelector = (state: RootState) => state.sensors.sensors[_log]?.data;
    const loggingSensorData = useSelector(loggingSelector);

    const selectUser = (state: RootState) => state.user;
    const user = useSelector(selectUser); 

    const handleStopSession = useCallback((e, name) => {
        console.log("Stopping from Component: ", name)
    }, [dispatch])

    const handleStartSession = useCallback((e, name) => {
        console.log("Starting From Component: ", name)
        dispatch(startSession( { name }))
    }, [dispatch])

    return (
        <>
            <Paper className={classes.rootPaper}>
                <CurrentTime />
                <Grid container spacing={3} className={classes.gridContainer}>
                    <DashStatusItem name="ECU" data={ecuSensorData}/>
                    <DashStatusItem name="ENGINE" data={engineSensorData}/>
                    <DashStatusItem name="BATTERY" data={batterySensorData}/>
                    <DashStatusItem name="LOGGING" data={loggingSensorData}/>
                </Grid>
            </Paper>
            <Paper className={classes.rootPaper}>
                <DashSensors />
            </Paper>
            <Paper className={classes.rootPaper}>
                <DashSession handleStart={handleStartSession} handleStop={handleStopSession}/>
            </Paper>
        </>
    )
}

export default Dash; 
