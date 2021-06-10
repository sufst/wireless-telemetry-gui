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

// Module Imports
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux' 

// Styles 
import { useStyles } from "./styles";

// Redux Imports
import type { RootState } from 'redux/store';

const AlertContainer = () => {
    const classes = useStyles();

    const selectAlert = (state: RootState) => state.alert;
    const { text, type, timeout, level } = useSelector(selectAlert); 

    if (type === undefined) {
        return null;
    }

    return type === 'snack' ? (
        <Snackbar open={ type === "snack" } autoHideDuration={timeout}>
            <MuiAlert elevation={6} variant="filled" className={classes.alert} severity={level}>
                {text ?? ''}
            </MuiAlert>
        </Snackbar>
    ) : (
        <MuiAlert elevation={6} variant="filled" className={classes.alert} severity={level}>
            {text ?? ''}
        </MuiAlert>
    )
}

export default AlertContainer;