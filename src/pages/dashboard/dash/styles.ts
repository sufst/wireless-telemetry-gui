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
    rootPaper: {
        flexGrow: 1,
        padding: '1rem',
        marginBottom: '1rem',
        marginTop: '1rem',
        background: '#292929'
    }, 
    gridContainer: {
        marginTop: '0.5rem',
        marginBottom: '0.5rem'
    },
    item: {
        height: '130px'
    },
    box: {
        color: 'white',
        height: '120px',
        fontWeight: 'bold',
        fontSize: '24px',
        borderRadius: '10px',
        backgroundColor: 'green',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
}));