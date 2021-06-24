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

import { UserState } from "redux/typing";
import { useStyles } from "./styles";

import { v4 }from 'uuid';

import { 
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
   Avatar,
   Grid,
   Typography,
} from '@material-ui/core';

export const AdminPanelTable = (props: { users: UserState[]}) => {
   const classes = useStyles(); 

   const users = props.users; 
   
   return (
      <TableContainer component={Paper} className={classes.tableContainer}>
         <Table className={classes.table} aria-label="simple table">
            <AdminPanelTableHead /> 
            <TableBody>
               {users.map((user) => (
                  <AdminPanelTableRow user={user} key={v4()}/>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   )
}

const AdminPanelTableRow = (props: { user: UserState }) => {
   const classes = useStyles(); 

   const user = props.user; 

   // TODO: Remove force unwrapping here. Make it safer. 
   const createdAt = new Date(user.creation!! * 1000).toLocaleString('en-GB', {day: 'numeric', month: 'numeric', year: 'numeric'});

   return (
      <TableRow>
         <TableCell>
            <Grid container>
                  <Grid item lg={2}>
                     <Avatar alt={user.username} src='.' className={classes.avatar}/>
                  </Grid>
                  <Grid item lg={10}>
                     <Typography className={classes.name}>{user.username}</Typography>
                  </Grid>
            </Grid>
         </TableCell>

         <TableCell>
            <Typography color="primary" variant="subtitle2">{user.department}</Typography>
         </TableCell>

         <TableCell>
            {user.privilege}
         </TableCell>

         <TableCell>
            {createdAt}
         </TableCell>
      </TableRow>
   )
}

const AdminPanelTableHead = () => {
   const classes = useStyles(); 

   return (
      <TableHead>
         <TableRow>
            <TableCell className={classes.tableHeaderCell}>Username</TableCell>
            <TableCell className={classes.tableHeaderCell}>Department</TableCell>
            <TableCell className={classes.tableHeaderCell}>Privilege</TableCell>
            <TableCell className={classes.tableHeaderCell}>Created At</TableCell>
         </TableRow>
      </TableHead>
   )
}