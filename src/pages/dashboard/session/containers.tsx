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
import { createSession, getAllSessions, stopSession } from "modules/api/sessions";
import { useDispatch, useSelector } from "react-redux";
import store, {RootState} from "../../../redux/store";
import { SessionsGetResponse } from "modules/api/typing";
import { CurrentSessionHeader, NewSessionContainer, SessionTable } from "./components";
import { showAlert } from "redux/slices/alert";
import { createAlert } from "modules/alert/alert";

export const SessionContainer = () => {

    const dispatch = useDispatch(); 

    // Session Name from Redux
    const selectSessionName = (state: RootState) => state.session.sessionName; 
    const sessionName = useSelector(selectSessionName); 

    // Session Groups from Redux
    const selectSessionGroups = (state: RootState) => state.session.sessionSensors; 
    const sessionGroups = useSelector(selectSessionGroups); 

    const [sessionData, setSessionData] = useState({})

    // Sensor Groups from Redux
    const selectGroups = (state: RootState) => state.sensors.groups;
    const groups = useSelector(selectGroups);
    const sensorGroupNames = Object.keys(groups);

    const sessionNameLabelText: string = sessionName === "" ? "Not Running" : sessionName;

    const fetchAllSessions = useCallback(async () => {
        const sessions = await getAllSessions();
        setSessionData(sessions); 
     }, [])

    useEffect(() => {
        fetchAllSessions(); 
    },[fetchAllSessions])

  
    const onStartClicked = useCallback(async () => {
        // Fetching token, name and group sessions from Redux 
        const accessToken = store.getState().user.accessToken;  
        const sessionSensorGroups = store.getState().session.sessionSensors; 
        const name = store.getState().session.sessionName; 

        // TODO: Metadata for session. Things like driver, condition and track can go here.  
        const sessionMeta = { }; 

        // Creates an array of all the names of the sensors to be saved in the session. 
        const groupsForSession = Object.entries(groups).filter((group: [key: string, value: string[]]) => sessionSensorGroups.includes(group[0]))
        const sensors = groupsForSession.map((group: [key: string, value: string[]]) => (group[1])).flat();

        console.log('Creating session with:', name, sensors);
        
        const createSuccess = await createSession(accessToken!, name, sessionMeta, sensors); 

        if (createSuccess) {
            dispatch(showAlert(createAlert(3000, "success", "snack", `Success! ${name} session successfully created!`))); 

            // TODO: Handle running flag for session. 
        }
        else {
            dispatch(showAlert(createAlert(3000, "error", "snack", `Error! ${name} session not created!`))); 
        }
        
    }, [dispatch, groups])

    // const onNewSubmit = useCallback( async (event) => {
    //     event.preventDefault();
        
    //     const name = event.target.sessionName.value; 
    //     const driver = event.target.sessionDriver.value; 
    //     const conditions = event.target.sessionConditions.value;

    //     setName(name);
    //     const accessToken = store.getState().user.accessToken;

    //     const invalidNameRegex = new RegExp('^ *$');
    //     if(invalidNameRegex.test(name) || !(sensorGroups.length>0)){
    //         setError(true);
    //         dispatch(showAlert(createAlert(3000, "error", "snack", `Error! ${name} session not created!`))); 
    //         return;
    //     }

    //     setError(false)

    //     const sensors = Object.entries(groups).filter((group: [key: string, value: string[]]) => sensorGroups.includes(group[0])).map((group: [key: string, value: string[]]) => (group[1])).flat();
        
    //     const success = await createSession(accessToken!, name, {}, sensors)
        
    //     if(success) {
    //         dispatch(showAlert(createAlert(3000, "success", "snack", `Success! ${name} session successfully created!`))); 
    //         setRunning(!running);
    //     }
    //     else {
    //         dispatch(showAlert(createAlert(3000, "error", "snack", `Error! ${name} session not created!`))); 
    //     }
    // }, [dispatch, running, sensorGroups, groups]);

    const classes = useStyles(); 
    return (
        <>
            <Paper className={classes.rootPaper}>
                <CurrentSessionHeader name={sessionNameLabelText}/>
            </Paper>
            <Paper className={classes.rootPaper}>
                <NewSessionContainer 
                    onSubmit={onStartClicked}
                    sensorGroups={sensorGroupNames}
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