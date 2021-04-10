/*
    Southampton University Formula Student Team
    Copyright (C) 2021 Nathan Rowley-Smith

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
import React, {
    useEffect
} from "react";
import {
    RealTimeGraphs
} from "../realtimegraphs/index";
import {
    sio
} from "../backend/backend";
import {
    buildConfigStoreFromSensorConfig,
    buildDataStoreFromSensorConfig,
    useSensorConfigDispatch,
    useSensorDataDispatch,
    useSensorsData
} from "../store/sensors";

import { useStyles } from "./styles";

import clsx from 'clsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Button } from "@material-ui/core";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SpeedIcon from '@material-ui/icons/Speed';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import StorageIcon from '@material-ui/icons/Storage';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import SettingsIcon from '@material-ui/icons/Settings';
import InstagramIcon from '@material-ui/icons/Instagram';
import LockIcon from '@material-ui/icons/Lock';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';

export function DashContainer(props) {
    const dataDispatch = useSensorDataDispatch();

    const sensors = useSensorsData();

    useEffect(() => {
        sio.once("data", message => {
            const data = JSON.parse(message);
    
            console.log(data);
    
            dataDispatch({type: "bulk_update", updates: data});
        });
    }, [dataDispatch, sensors]);

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const classes = useStyles();

    const icons = (index) => {
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
                return <InstagramIcon /> 
            case 6: 
                return <TwitterIcon /> 
            case 7: 
                return <GitHubIcon /> 
            case 8: 
                return <RssFeedIcon /> 
            case 9: 
                return <SettingsIcon /> 
        }
    }
    
    return (
        <>
            <div className={classes.root}>
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
                    {['Account', 'Dashboard', 'Session', 'Admin', 'Database', 'Instagram', 'Twitter', 'GitHub', 'Feed', 'Settings'].map((text, index) => (
                        <ListItem button key={text}>
                        <ListItemIcon>
                            {icons(index)}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        </ListItem>
                    ))}
                    </List>
                </Drawer>
            </div>
            <RealTimeGraphs />
        </>
    );
}

export function DashLoaderContainer(props) {
    const configDispatch = useSensorConfigDispatch();
    const dataDispatch = useSensorDataDispatch();

    useEffect(() => {
        sio.once("meta", message => {
            const meta = JSON.parse(message);
            console.log(meta);
            const configBuild = buildConfigStoreFromSensorConfig(meta);
            const dataBuild = buildDataStoreFromSensorConfig(meta);
            configDispatch({type: "build", build: configBuild});
            dataDispatch({type: "build", build: dataBuild});

            props.finishedCallback(undefined);
        });
    }, [configDispatch, dataDispatch, props]);

    return (
        <h1>Loading...</h1>
    );
}