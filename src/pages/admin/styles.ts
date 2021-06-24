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

import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
   table: {
     minWidth: 650,
   },
   tableContainer: {
       borderRadius: 15,
       margin: '10px 10px',
       maxWidth: 950
   },
   tableHeaderCell: {
       fontWeight: 'bold',
       backgroundColor: theme.palette.primary.dark,
       color: theme.palette.getContrastText(theme.palette.primary.dark)
   },
   avatar: {
       backgroundColor: theme.palette.primary.light,
       color: theme.palette.getContrastText(theme.palette.primary.light)
   },
   name: {
       fontWeight: 'bold',
       color: theme.palette.secondary.dark
   },
   status: {
       fontWeight: 'bold',
       fontSize: '0.75rem',
       color: 'white',
       backgroundColor: 'grey',
       borderRadius: 8,
       padding: '3px 10px',
       display: 'inline-block'
   }
 }));