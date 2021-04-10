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

import { useStyles } from '../style';

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
