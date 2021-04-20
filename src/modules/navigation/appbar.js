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
import React from 'react'
import clsx from 'clsx';

// Material UI Imports 
import { AppBar, Badge, CssBaseline, IconButton, Toolbar, Typography } from '@material-ui/core'

// Material UI Icon Imports
import MenuIcon from '@material-ui/icons/Menu';
import LockIcon from '@material-ui/icons/Lock';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

import { useStyles } from './styles';

const AppNavigationBar = ({ handleDrawerOpen, open }) =>  {
   const classes = useStyles(); 

   return (
      <div>
         <CssBaseline />
         <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
            })}
         >
            <Toolbar>
               <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                  })}
               >
                  <MenuIcon />
               </IconButton>
               <Typography variant="h6" noWrap className={classes.title}>
                  SUFST Wireless GUI
               </Typography>
               <IconButton aria-label="" color="inherit">
                  <Badge color="secondary">
                     <NotificationsIcon />
                  </Badge>
               </IconButton>
               <IconButton aria-label="" color="inherit">
                  <Badge color="secondary">
                     <NotificationsActiveIcon />
                  </Badge>
               </IconButton>
               <IconButton aria-label="" color="inherit">
                  <Badge color="secondary">
                     <NotificationsNoneIcon />
                  </Badge>
               </IconButton>
               <IconButton aria-label="login" color="inherit">
                  <Badge color="secondary">
                     <LockIcon />
                  </Badge>
               </IconButton>
            </Toolbar>
         </AppBar>
      </div>
   )
}

export default AppNavigationBar
