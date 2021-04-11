// Module Imports
import React from 'react'
import { Redirect, useHistory } from "react-router";
import clsx from 'clsx';

// Material UI Imports 
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { useTheme } from '@material-ui/core/styles';
import { useStyles } from '../style'

// Material UI Icons Imports 
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SpeedIcon from '@material-ui/icons/Speed';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import StorageIcon from '@material-ui/icons/Storage';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import SettingsIcon from '@material-ui/icons/Settings';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Link } from 'react-router-dom';


const AppSideBar = ({ open, handleDrawerClose }) => {
    const classes = useStyles();
    const theme = useTheme();

    const history = useHistory();

    const actionTitles = ['Account', 'Dashboard', 'Session', 'Admin', 'Database', 'Feed', 'Settings']

    const socialTitles = ['Instagram', 'Twitter', 'GitHub']
   
    const actionIcons = (index) => {
        switch (index) {
            case 0: 
                return <AccountCircleIcon /> 
            case 1: 
                return <SpeedIcon /> 
            case 2: 
                return <AccessTimeIcon /> 
            case 3: 
                return <SupervisorAccountIcon /> 
            case 4: 
                return <StorageIcon />
            case 5: 
                return <RssFeedIcon /> 
            case 6: 
                return <SettingsIcon /> 
        }
    }

    const socialIcons = (index) => {
        switch (index) {
            case 0: 
                return <InstagramIcon/>
            case 1: 
                return <TwitterIcon /> 
            case 2: 
                return <GitHubIcon /> 
        }
    }

    const handleActionIconClicked = (index) => () => {
        switch (index) {
            case 0:
                history.push('/account')
                break;
            case 1:
                history.push('/dashboard')
                break;
            default:
                break;
        }
    }

    const handleSocialIconClicked = (index) => () => {
        switch (index) {
            case 0: 
                console.log('INSTA');
                break; 
            case 1:
                console.log('TWITTER');
                break;
            case 2:
                console.log('GITHUB');
                break;
        }
    }

    return (
      <div>
         <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            })}
            classes={{
            paper: clsx({
               [classes.drawerOpen]: open,
               [classes.drawerClose]: !open,
            }),
            }}
         >
            <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
               {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
            </div>
            <Divider />
            <List>
                {actionTitles.map((text, index) => (
                <ListItem button key={text} onClick={handleActionIconClicked(index)}>
                    <ListItemIcon >
                            {actionIcons(index)}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {socialTitles.map((text, index) => (
                <ListItem button key={text} onClick={handleSocialIconClicked(index)}>
                    <ListItemIcon >
                        {socialIcons(index)}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
                ))}
            </List>
         </Drawer>
      </div>
   )
}

export default AppSideBar; 