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

export const Session = () => {
    // TODO: setName to be used later - disabled warning for now
    // eslint-disable-next-line
    const [name, setName] = useState(undefined);
    const [running, setRunning] = useState(false);

    const sessionName = name ?? "No Session";
    const startStopColour = running ? "secondary" : "primary";
    const startStopText = running ? "STOP" : "START";

    const onStartStopClick = useCallback(() => {
        setRunning(!running);
    }, [running]);

    const onNewSubmit = useCallback((event) => {
        event.preventDefault();
        
        const sessionName = event.target.sessionName.value; 
        setName(sessionName); 
    }, []);

    const classes = useStyles(); 

    return (
        <Paper className={classes.rootSessionPaper}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Header name={sessionName}/>
                </Grid>
                <Grid item xs={12}>
                    <StartStop colour={startStopColour} text={startStopText} onClick={onStartStopClick}/>
                </Grid>
                <Grid item xs={12}>
                    <NewSession onSubmit={onNewSubmit}/>
                </Grid>
            </Grid>
        </Paper>
    );
}