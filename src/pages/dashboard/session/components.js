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
    Accordion,
    Paper, 
    Typography,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Button
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    useStyles
} from "./styles";

export const Header = (props) => {
    return (
        <Paper>
            <Typography variant="h6" gutterBottom>
                {props.name}
            </Typography>
        </Paper>
    );
}

export const NewSession = (props) => {
    const classes = useStyles();

    return (
        <Accordion>
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
                    <TextField id="standard-basic" label="Name"/>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
            </AccordionDetails>
        </Accordion>
    );
}

export const StartStop = (props) => {
    return (
        <Button variant="contained" color={props.colour} onClick={props.onClick}>
            {props.text}
        </Button>
    )
}
