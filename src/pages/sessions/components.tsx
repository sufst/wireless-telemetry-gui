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
import { useCallback, useState } from "react";
import { SessionsGetResponse } from "types/api/api";
import { useStyles } from "../dashboard/session/styles";
import { saveAs } from 'file-saver';

export const SessionPaper = () => {
    const classes = useStyles();
    
    return (
        <Paper className={classes.rootPaper}>
            <p className={classes.newSessionText}>Session</p>
        </Paper>
    )
}

export const SensorChooser = (props: { allGroups: string[], selectedGroups: string[], onSensorChangeCallback: (sensor : string) => void, disabled: boolean }) => {
    
    const checkboxes = props.allGroups.map(groupName => {
        return (
            <FormControlLabel
                control = { <Checkbox id={groupName} 
                                      checked={props.selectedGroups.includes(groupName)}
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
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => downloadSession(sessionEntry)}>
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

const downloadSession = (sessionEntry: any) => {
    alert("Downloading session...");
    console.log(sessionEntry);
    saveCSV([sessionEntry]);
}

const saveCSV = (sessionEntries: any) => {
    let output = "";
    for(let entry of sessionEntries) {
        output += entry[0] + entry[1].name
    }
    const myFile = new File([output], "sessions.csv", {type: "text/csv;charset=utf-8"});
    saveAs(myFile);
}
