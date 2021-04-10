// React Imports 
import React from 'react'

// Components Impors 
import AppNavigationBar from './appBar'
import AppSideBar from './sideBar'

// Material UI Imports 
import { useStyles } from './style'

/**
 * A Container that holds all the logic & views for the main AppBar and the AppSideBar 
 */
const AppNavContainer = () => {
   const classes = useStyles(); 

   const [open, setOpen] = React.useState(false);
  
   const handleDrawerOpen = () => {
      setOpen(true);
   };
  
   const handleDrawerClose = () => {
      setOpen(false);
   };

   return (
      <div className={classes.navigationRoot}>
         <AppNavigationBar open={open} handleDrawerOpen={handleDrawerOpen}/>
         SideBar
         <AppSideBar open={open} handleDrawerClose={handleDrawerClose} />
      </div>
   )
}

export default AppNavContainer
