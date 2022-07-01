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

import { 
    Paper, 
    Typography,
    TextField,
    Box,
    FormLabel,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    Table,
    TableBody,
    TableContainer,
    TableCell,
    TableHead,
    TableRow,
    Checkbox, 
    Grid
} from "@material-ui/core";
import GetAppIcon from '@material-ui/icons/GetApp';
import { SessionsGetResponse } from "modules/api/typing";
import { useCallback, useState } from "react";
import { useStyles } from "./styles";
import { StartSessionButtonAction } from "./typing";

export const CurrentSessionHeader = (props: { name: string }) => {
    const classes = useStyles(); 

    return (
        <Typography variant="h6" className={classes.currentSessionTypo}>
            <span className={classes.currentSessionText}>Current Session: </span><span className={classes.sessionName}>{props.name}</span>
        </Typography>
    );
}

export const SessionPaper = () => {
    const classes = useStyles();
    
    return (
        <Paper className={classes.rootPaper}>
            <p className={classes.newSessionText}>Session</p>
        </Paper>
    )
}

export const NewSessionContainer = (props: { onSubmit: StartSessionButtonAction, onStop: () => void, sensorGroups: string[], isRunning: boolean }) => {
    
    const classes = useStyles(); 

    const [name, setName] = useState(""); 
    const [driver, setDriver] = useState(""); 
    const [condition, setCondition] = useState(""); 
    const [sensorGroups, setSensorGroups] = useState<string[]>([]); 

    // Error state for the MUI FormControl 
    const [error, setError] = useState(false);

    const isSessionRunning = props.isRunning; 

    const startButtonClasses = useCallback(() => {
        if (!isSessionRunning) {
            return classes.sessionButtonStartBox
        } else {
            return classes.sessionButtonStartBoxDisabled
        }
    }, [isSessionRunning])

    const stopButtonClasses = useCallback(() => {
        if (!isSessionRunning) {
            return classes.sessionButtonStopBoxDisabled
        } else {
            return classes.sessionButtonStopBox
        }
    }, [isSessionRunning])
 
    const startPressed = useCallback(() => {
        if (name === "" || sensorGroups.length === 0) {
            setError(true)
            return; 
        }    
        console.log('Starting: ', name, driver, condition, sensorGroups);
        
        props.onSubmit(name, driver, condition, sensorGroups); 
    }, [name, driver, condition, sensorGroups])

    const stopPressed = useCallback(() => {
        props.onStop();
    }, [props])

    
    // Called when one of the checkboxes is clicked. 
    // Sets the sensorGroups state array with the new values. 
    const onSensorChange = useCallback((newSensorGroup: string) => {
        if (sensorGroups.includes(newSensorGroup)) {
            setSensorGroups(sensorGroups.filter(sensorGroup => sensorGroup !== newSensorGroup))
        }
        else {
            const newSensors = sensorGroups.concat(newSensorGroup)
            setSensorGroups(newSensors);
        }
    }, [sensorGroups])

    return (
        <>
            <p className={classes.newSessionText}>New Session</p>
            <FormControl error={error} >
                <Box>
                    <TextField label="Session Name" 
                        className={classes.newSessionTextField} 
                        value={name} 
                        disabled={isSessionRunning}
                        helperText={isSessionRunning ? "Session is already running" : null}
                        onChange={e => {
                            setName(e.target.value);
                        }}
                    />
                    <TextField label="Driver" 
                        className={classes.newSessionTextFieldMargin}
                        value={driver}
                        disabled={isSessionRunning}
                        onChange={e => {
                            setDriver(e.target.value); 
                        }}
                    />
                    <TextField label="Conditions" 
                        className={classes.newSessionTextFieldMargin}
                        value={condition}
                        disabled={isSessionRunning}
                        onChange={e => {
                            setCondition(e.target.value);
                        }}
                    />
                </Box>
                <SensorChooser 
                    sensorGroups={props.sensorGroups} 
                    onSensorChangeCallback={onSensorChange}
                    disabled={isSessionRunning}
                />
                {
                    isSessionRunning && 
                        <p className={classes.sessionAlreadyRunningText}>
                            Session is already running. You can't edit these now. 
                        </p>
                }
                {
                error && 
                    <FormHelperText>
                        Set a name and choose at least one sensor
                    </FormHelperText>
                }
                <Grid container className={classes.gridContainer} spacing={3}>
                    <Grid item xs={4} onClick={startPressed}>
                        <Box className={startButtonClasses()}>
                            Start Session
                        </Box>
                    </Grid>
                    <Grid item xs={4} onClick={stopPressed}>
                        <Box className={stopButtonClasses()}>
                            Stop Session
                        </Box>
                    </Grid>
                </Grid>
            </FormControl>
        </>
    )
}

export const SensorChooser = (props: { sensorGroups: string[], onSensorChangeCallback: (sensor : string) => void, disabled: boolean }) => {
    
    const checkboxes = props.sensorGroups.map(groupName => {
        return (
            <FormControlLabel
                control = { <Checkbox id={groupName} 
                                      onChange={() => props.onSensorChangeCallback(groupName)} 
                                      style={{ color: 'lightBlue' }} 
                          /> } 
                label={ groupName }
                disabled={props.disabled} />
        )
    })

    const classes = useStyles(); 

    return (
        <Box className={classes.sensorChooserBox}>
            <FormLabel component="legend" className={classes.formLabel}>Sensors</FormLabel>
            {checkboxes}
        </Box>
    )
}

export const SessionTable = (props: { sessionData: SessionsGetResponse }) => {
    const classes = useStyles(); 

    const sessionEntries = Object.entries(props.sessionData);
    const info = sessionEntries.map(sessionEntry => {
        const name = sessionEntry[0]
        const sessionInfo = sessionEntry[1]
        return {
            name,
            status: sessionInfo.status,
            created: (new Date(sessionInfo.creation)).toString(),
            actions: <>
            {/* TODO: Add callback to download data and add button to stop session */}
            <IconButton color="primary" aria-label="upload picture" component="span">
                <GetAppIcon />
            </IconButton>
          </>
        }
    });
    return (
        <div>
            <p className={classes.newSessionText}>All Sessions</p>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Creation Date</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {info.map((sessionEntry) => (
                            <TableRow key={sessionEntry.name}>
                            <TableCell component="th" scope="row">
                                {sessionEntry.name}
                            </TableCell>
                            <TableCell align="right">{sessionEntry.status}</TableCell>
                            <TableCell align="right">{sessionEntry.created}</TableCell>
                            <TableCell align="right">{sessionEntry.actions}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>           
        </div>
    )
}