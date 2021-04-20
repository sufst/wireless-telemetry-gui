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
import React, { useContext } from 'react'
import { useHistory } from "react-router";
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
import { useDispatch } from 'react-redux';
import { show } from '../../redux/slices/alertSlice';

const AppSideBar = ({ open, handleDrawerClose }) => {
    const classes = useStyles();
    const theme = useTheme();

    const history = useHistory();

    const dispatch = useDispatch()

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
                // Setting an example alert
                //setAlertHere(); 
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

    // Example of setting an alert - Please see alert/Alert.js for allowd 'type' values
    const setAlertHere = () => {
        const demo = {
            timeout: 5000,
            level: 'error', 
            type: 'alert',
            text: 'something happened!'
        }
        dispatch(show(demo))
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