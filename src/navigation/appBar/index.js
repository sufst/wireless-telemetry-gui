import { AppBar, Button, CssBaseline, IconButton, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

import React from 'react'
import { useStyles } from '../style';
import clsx from 'clsx';


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
               <Button color="inherit">Login</Button>
            </Toolbar>
         </AppBar>
      </div>
   )
}

export default AppNavigationBar
