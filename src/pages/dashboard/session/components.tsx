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
    Accordion,
    Paper, 
    Typography,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Button,
    Box,
    FormLabel,
    FormControl,
    FormGroup,
    FormControlLabel,
    FormHelperText,
    IconButton,
    Table,
    TableBody,
    TableContainer,
    TableCell,
    TableHead,
    TableRow,
    Checkbox 
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GetAppIcon from '@material-ui/icons/GetApp';
import { SessionsGetResponse } from "modules/api/typing";
import {
    useStyles
} from "./styles";

export const Header = (props: { name: string }) => {
    const classes = useStyles(); 

    return (
        <Paper className={classes.headerPaper}>
            <Typography variant="h6" gutterBottom>
                <span className={classes.currentSessionText}>Current Session: </span><span className={classes.sessionName}>{props.name}</span>
            </Typography>
        </Paper>
    );
}

export const NewSession = (props: { error: boolean, onSensorChangeCallback: (sensor : string) => void, onSubmit: (event: any) => void, sensorGroups: string[]}) => {
    const classes = useStyles();

    return (
        <Accordion className={classes.newSessionWrapper}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}>
                    New Session
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={props.onSubmit}>
                    <FormControl
                        error={props.error}
                    >
                        <Box style={{ display: 'flex' }}>
                            <TextField id="sessionName" label="Name" className={classes.newSessionTextField}/>
                            <TextField id="sessionDriver" label="Driver" className={classes.newSessionTextField}/>
                            <TextField id="sessionConditions" label="Conditions" className={classes.newSessionTextField}/>
                        </Box>
                        <SensorChooser sensorGroups={props.sensorGroups} onSensorChangeCallback={props.onSensorChangeCallback}/>
                        <Button type="submit" variant="contained" color="primary" className={classes.newSessionSubmitBtn}>
                            Submit
                        </Button>
                        {props.error && <FormHelperText>Set a name and choose at least one sensor</FormHelperText>}
                    </FormControl>
                </form>
            </AccordionDetails>
        </Accordion>
    );
}

export const StartStop = (props: { onClick: () => void, colour: string, text: string }) => {
    const classes = useStyles(); 

    return (
        // Seems typescript doesn't understand color
        // @ts-ignore
        <Button variant="contained" color={props.colour} onClick={props.onClick} className={classes.startStopBtn}>
            {props.text}
        </Button>
    )
}

export const SensorChooser = (props: { sensorGroups: string[], onSensorChangeCallback: (sensor : string) => void}) => {
    const checkboxes = props.sensorGroups.map(groupName => {
        return <FormControlLabel control={<Checkbox id={groupName} onChange={() => props.onSensorChangeCallback(groupName)}/>} label={groupName} />
    })

    return (
        <Box style={{ display: 'flex' }}>
            <FormLabel component="legend">Sensors</FormLabel>
            <FormGroup>
                {checkboxes}
            </FormGroup> 
        </Box>
    )
}

export const SessionTable = (props: { sessionData: SessionsGetResponse }) => {
    const sessionEntries = Object.entries(props.sessionData);
    const info = sessionEntries.map(sessionEntry => {
        const name = sessionEntry[0]
        const sessionInfo = sessionEntry[1]
        return {
            name,
            status: sessionInfo.status,
            created: (new Date(sessionInfo.creation)).toString(),
            actions: <>
            {/* TODO Add callback to download data and add button to stop session */}
            <IconButton color="primary" aria-label="upload picture" component="span">
                <GetAppIcon />
            </IconButton>
          </>
        }
    });
    return (
        <div>
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