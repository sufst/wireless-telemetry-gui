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

import { Avatar, Box, Typography, Link } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useStyles } from "./styles";

export const RegisterHeader = () => {
   const classes = useStyles();

   return (
      <>
         <Avatar className={classes.avatar}>
            <AccountCircleIcon />
         </Avatar>
         <Typography component="h1" variant="h5">
            Please Enter the User Details
         </Typography>
      </>
   )
}

export const RegisterFooter = () => {
   return (
      <Box mt={4} >
         <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://sufst.co.uk/">
            SUFST
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
         </Typography>
      </Box>
   );
}