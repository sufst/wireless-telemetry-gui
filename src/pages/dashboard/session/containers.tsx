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
import { Paper } from "@material-ui/core";
import { useStyles } from "./styles";
import { createSession, getAllSessions } from "modules/api/sessions";
import { useDispatch, useSelector } from "react-redux";
import store, {RootState} from "../../../redux/store";
import { SessionsGetResponse } from "modules/api/typing";
import { CurrentSessionHeader, NewSessionContainer, SessionTable } from "./components";
import { showAlert } from "redux/slices/alert";
import { createAlert } from "modules/alert/alert";
import { startSession, stopSession } from "redux/slices/sessions";
import { StartSessionButtonAction } from "./typing";

export const SessionContainer = () => {

    const dispatch = useDispatch(); 

    const classes = useStyles(); 

    // Session Name from Redux
    const selectSessionName = (state: RootState) => state.session.sessionName; 
    const sessionName = useSelector(selectSessionName); 

    // Session isRunning from Redux 
    const selectIsRunning = (state: RootState) => state.session.isRunning; 
    const isSessionRunning = useSelector(selectIsRunning);
    
    const [sessionData, setSessionData] = useState({})

    // Sensor Groups from Redux
    const selectGroups = (state: RootState) => state.sensors.groups;
    const groups = useSelector(selectGroups);
    const sensorGroupNames = Object.keys(groups);

    const sessionNameLabelText: string = sessionName === "" ? "NOT RUNNING" : sessionName;

    // Current Logged in User from Redux
    const selectUser = (state: RootState) => state.user;
    const user = useSelector(selectUser); 

    const { privilege } = user; 


    const fetchAllSessions = useCallback(async () => {
        const sessions = await getAllSessions();
        setSessionData(sessions); 
     }, [])

    useEffect(() => {
        fetchAllSessions(); 
    },[fetchAllSessions])


    const handleStartSession: StartSessionButtonAction = useCallback((name, driver, condition, sessionSensorGroups) => {

        // Creates an array of all the names of the sensors to be saved in the session. 
        const groupsForSession = Object.entries(groups).filter((group: [key: string, value: string[]]) => sessionSensorGroups.includes(group[0]))
        const sensors = groupsForSession.map((group: [key: string, value: string[]]) => (group[1])).flat();
        
        dispatch(startSession( { name, driver, condition, sensors }))
    }, [])

    const onStartClicked: StartSessionButtonAction = useCallback((name, driver, condition, sensors) => {
        if (privilege !== 'Admin' && privilege !== 'Developer') {
            const createSessionFailedAlert = createAlert(3000, "error", "snack", "Login to start a new session."); 
            dispatch(showAlert(createSessionFailedAlert));
            return; 
        }

        handleStartSession(name, driver, condition, sensors);
    }, [privilege])

    const onStopClicked = useCallback(() => {
        console.log('Stopping Session.');
        dispatch(stopSession()); 
    }, [])

    const currentSessionStyles = useCallback(() => {
        return isSessionRunning ? classes.rootPaperRunningSession : classes.rootPaper; 
    }, [isSessionRunning])

    return (
        <>
            <Paper className={currentSessionStyles()}>
                <CurrentSessionHeader name={sessionNameLabelText}/>
            </Paper>
            <Paper className={classes.rootPaper}>
                <NewSessionContainer 
                    onSubmit={onStartClicked}
                    onStop={onStopClicked}
                    sensorGroups={sensorGroupNames}
                    isRunning={isSessionRunning}
                />
            </Paper>
            <Paper className={classes.rootPaper}>
                {/* TODO: Loading logic needs to go back in */}
                {/* <>
                    {!isLoading.sessions && (
                        <SessionTable sessionData={sessionData}/>
                    ) || (
                        <LinearProgress />
                    )}
                </> */}
                <SessionTable sessionData={sessionData} />
            </Paper>
        </>
    )
}