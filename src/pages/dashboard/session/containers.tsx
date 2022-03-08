/*
    Southampton University Formula Student Team
    Copyright (C) SUFST

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
import {
    useCallback,
    useState
} from "react";
import { 
    Grid, 
    Paper 
} from "@material-ui/core";
import {
    Header,
    NewSession,
    StartStop
} from "./components";
import { useStyles } from "./styles";
import { sessionCreate, sessionStop } from "modules/api/sessions";
import { useDispatch, useSelector } from "react-redux";
import { createAlert } from "modules/alert/alert";
import { showAlert } from "redux/slices/alert";
import store, {RootState} from "../../../redux/store";

export const Session = () => {
    // TODO: setName to be used later - disabled warning for now
    // eslint-disable-next-line
    const [name, setName] = useState(undefined);
    // const [driver, setDriver] = useState(undefined);
    // const [conditions, setConditions] = useState(undefined);
    const [running, setRunning] = useState(false);
    const [sensorGroups, setSensorGroups] = useState<Array<string>>([])
    const [error, setError] = useState(false)

    const sessionName = name ?? "No Session";
    const startStopColour = running ? "secondary" : "primary";
    const startStopText = running ? "STOP" : "START";
    const dispatch = useDispatch();
    const selectGroups = (state: RootState) => state.sensors.groups;
    const groups = useSelector(selectGroups);
    const sensorGroupNames = Object.keys(groups);

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
            sessionStop(accessToken, name)
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
        
        console.log(sensorGroups);

        const sensors = Object.entries(groups).filter((group: [key: string, value: string[]]) => sensorGroups.includes(group[0])).map((group: [key: string, value: string[]]) => (group[1])).flat();
        
        const success = await sessionCreate(accessToken, sensors as [string], { name, driver, conditions })
        
        if(success) {
            dispatch(showAlert(createAlert(3000, "success", "snack", `Success! ${name} session successfully created!`))); 
            setRunning(!running);
        }
        else {
            dispatch(showAlert(createAlert(3000, "error", "snack", `Error! ${name} session not created!`))); 
        }
    }, [dispatch, running, sensorGroups]);

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
            </Grid>
        </Paper>
    );
}