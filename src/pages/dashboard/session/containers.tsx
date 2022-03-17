/*
    Southampton University Formula Student Team
    Copyright (C) 2022 SUFST

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

import { useCallback, useEffect, useState } from "react";
import { Grid, Paper, LinearProgress } from "@material-ui/core";

import { useStyles } from "./styles";
import { createSession, getAllSessions, stopSession } from "modules/api/sessions";
import { useDispatch, useSelector } from "react-redux";
import { createAlert } from "modules/alert/alert";
import { showAlert } from "redux/slices/alert";
import store, {RootState} from "../../../redux/store";
import { SessionsGetResponse } from "modules/api/typing";
import { Header, NewSession, SessionTable, StartStop } from "./components";

export const SessionContainer = () => {

    const [name, setName] = useState(undefined);
    const [running, setRunning] = useState(false);
    const [sensorGroups, setSensorGroups] = useState<Array<string>>([])
    const [error, setError] = useState(false)
    const [sessionData, setSessionData] = useState({})
    const [isLoading, setIsLoading] = useState({
        sessions: true
    })

    const sessionName = name ?? "No Session";
    const startStopColour = running ? "secondary" : "primary";
    const startStopText = running ? "STOP" : "START";
    const dispatch = useDispatch();
    const selectGroups = (state: RootState) => state.sensors.groups;
    const groups = useSelector(selectGroups);
    const sensorGroupNames = Object.keys(groups);

    const fetchAllSessions = useCallback(async () => {
        const sessions = await getAllSessions();
        setSessionData(sessions); 
     }, [])

    useEffect(() => {
        fetchAllSessions(); 
    },[fetchAllSessions])

    const onSensorChange = (newSensorGroup:string) => {
        if(sensorGroups.includes(newSensorGroup)){
            setSensorGroups(sensorGroups.filter(sensorGroup => sensorGroup!==newSensorGroup))
        }
        else{
            const newSensors = sensorGroups.concat(newSensorGroup)
            setSensorGroups(newSensors);
        }
    };

    const onStartStopClick = useCallback(() => {
        if(running === true) {
            const accessToken = store.getState().user.accessToken;
            stopSession(accessToken!, name!)
        }
        setRunning(!running);
    }, [running, name]);

    const onNewSubmit = useCallback( async (event) => {
        event.preventDefault();
        
        const name = event.target.sessionName.value; 
        const driver = event.target.sessionDriver.value; 
        const conditions = event.target.sessionConditions.value;

        setName(name);
        const accessToken = store.getState().user.accessToken;

        const invalidNameRegex = new RegExp('^ *$');
        if(invalidNameRegex.test(name) || !(sensorGroups.length>0)){
            setError(true);
            dispatch(showAlert(createAlert(3000, "error", "snack", `Error! ${name} session not created!`))); 
            return;
        }

        setError(false)

        const sensors = Object.entries(groups).filter((group: [key: string, value: string[]]) => sensorGroups.includes(group[0])).map((group: [key: string, value: string[]]) => (group[1])).flat();
        
        const success = await createSession(accessToken!, name, {}, sensors)
        
        if(success) {
            dispatch(showAlert(createAlert(3000, "success", "snack", `Success! ${name} session successfully created!`))); 
            setRunning(!running);
        }
        else {
            dispatch(showAlert(createAlert(3000, "error", "snack", `Error! ${name} session not created!`))); 
        }
    }, [dispatch, running, sensorGroups, groups]);

    const classes = useStyles(); 
    return (
        <Paper className={classes.rootSessionPaper}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Header name={sessionName}/>
                    <StartStop colour={startStopColour} text={startStopText} onClick={onStartStopClick}/>
                </Grid>
                <Grid item xs={12}>
                    <NewSession sensorGroups={sensorGroupNames} onSubmit={onNewSubmit} onSensorChangeCallback={onSensorChange} error={error}/>
                </Grid>
                <Grid item xs={12}>
                    {!isLoading.sessions && (
                    <SessionTable sessionData={sessionData}/>
                    ) || (
                        <LinearProgress />
                    )}
                </Grid>
            </Grid>
        </Paper>
    );
}