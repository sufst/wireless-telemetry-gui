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
import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router";
import clsx from "clsx";

// Material UI Imports
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { useTheme } from "@material-ui/core/styles";
import { useStyles } from "./styles";

// Material UI Icons Imports
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SpeedIcon from "@material-ui/icons/Speed";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import StorageIcon from "@material-ui/icons/Storage";
import RssFeedIcon from "@material-ui/icons/RssFeed";
import SettingsIcon from "@material-ui/icons/Settings";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";

interface AppSideBarProps {
  handleDrawerClose: () => void;
  open: boolean;
}

const AppSideBar: React.FC<AppSideBarProps> = ({ handleDrawerClose, open }) => {
    const classes = useStyles();
    const theme = useTheme();

    const history = useHistory();

    const actionTitles = ['Account', 'Dashboard', 'Session', 'Admin', 'Database', 'Feed', 'Settings']

    const socialTitles = ['Instagram', 'Twitter', 'GitHub'] 

    const actionIcons = useMemo(() => {
        return [
            <AccountCircleIcon />, 
            <SpeedIcon />,
            <AccessTimeIcon />,
            <SupervisorAccountIcon />,
            <StorageIcon />,
            <RssFeedIcon />,
            <SettingsIcon /> 
        ]
    }, []);

    const socialIcons = useMemo(() => {
        return [
            <InstagramIcon/>,
            <TwitterIcon />,
            <GitHubIcon />,
        ]
    }, []);

    const handleActionIconClicked = useMemo(() => [
        () => history.push('/account'),
        () =>  history.push('/dashboard'),
        () =>  history.push('/sessions'),
        () =>  history.push('/admin'),
        () =>  history.push('/dashboard'),
        () =>  history.push('/dashboard'),
        () =>  history.push('/dashboard'),
        
    ], [history])

    const handleSocialIconClicked = useMemo(() => [
        () => openSocial('https://www.instagram.com/sufst'),
        () => openSocial('https://twitter.com/sufst'),
        () => openSocial('https://github.com/orgs/sufst')
    ], [])

    const onIconClick = useCallback((index) => {
        if (index < handleActionIconClicked.length ) {
            handleActionIconClicked[index]()
        }
    }, [handleActionIconClicked])

    const onSocialClick = useCallback((index) => {
        if (index < handleSocialIconClicked.length ) {
            handleSocialIconClicked[index]()
        }
    }, [handleSocialIconClicked])

    const openSocial = (url: string) => {
        const win = window.open(url, '_blank');
        win?.focus(); 
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
                <ListItem button key={text} onClick={() => onIconClick(index)}>
                    <ListItemIcon >
                            {actionIcons[index]}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {socialTitles.map((text, index) => (
                <ListItem button key={text} onClick={() => onSocialClick(index)}>
                    <ListItemIcon >
                        {socialIcons[index]}
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