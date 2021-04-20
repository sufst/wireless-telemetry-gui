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

// Material UI Labs Imports
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';


import { useSelector } from 'react-redux';

const AppAlert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertContainer = (props) => {
    const alert = useSelector((state => state.alert)); 

    const { text, type, timeout, level } = alert; 

    if (type === undefined) {
        return null;
    }

    return type === 'snack' ? (
        <Snackbar open={ type === "snack" } autoHideDuration={timeout}>
            <AppAlert severity={level}>
                {text ?? ''}
            </AppAlert>
        </Snackbar>
    ) : (
        <MuiAlert elevation={6} variant="filled" {...props.props} severity={level}>
            {text ?? ''}
        </MuiAlert>
    )
}

export default AlertContainer;