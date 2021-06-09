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
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: '0'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    headerPaper: {
        margin: '1rem 1rem 0 1rem',
        padding: '0.5rem'
    },
    startStopBtn: {
        marginLeft: '1rem',
    },
    newSessionWrapper: {
        margin: '1rem 1rem 0 1rem',
    }, 
    newSessionSubmitBtn: {
        marginLeft: '0.5rem',
    }, 
    newSessionTextField: {
        width: '40%'
    },
    rootSessionPaper: {
        marginTop: '1rem'
    }
}));
