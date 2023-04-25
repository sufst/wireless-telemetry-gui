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
import Drawer from "@mui/core/Drawer";
import List from "@mui/core/List";
import Divider from "@mui/core/Divider";
import IconButton from "@mui/core/IconButton";
import ChevronLeftIcon from "@mui/icons/ChevronLeft";
import ChevronRightIcon from "@mui/icons/ChevronRight";
import ListItem from "@mui/core/ListItem";
import ListItemIcon from "@mui/core/ListItemIcon";
import ListItemText from "@mui/core/ListItemText";

import { useTheme } from "@mui/core/styles";
import { useStyles } from "./styles";
import InstallPwaListItem from "./InstallPwaListItem";

// Material UI Icons Imports
import AccountCircleIcon from "@mui/icons/AccountCircle";
import SpeedIcon from "@mui/icons/Speed";
import SupervisorAccountIcon from "@mui/icons/SupervisorAccount";
import AccessTimeIcon from "@mui/icons/AccessTime";
import StorageIcon from "@mui/icons/Storage";
import RssFeedIcon from "@mui/icons/RssFeed";
import SettingsIcon from "@mui/icons/Settings";
import InstagramIcon from "@mui/icons/Instagram";
import TwitterIcon from "@mui/icons/Twitter";
import GitHubIcon from "@mui/icons/GitHub";

interface AppSideBarProps {
  handleDrawerClose: () => void;
  open: boolean;
}

const AppSideBar: React.FC<AppSideBarProps> = ({ handleDrawerClose, open }) => {
  const classes = useStyles();
  const theme = useTheme();

  const history = useHistory();

  const actionTitles = [
    "Account",
    "Dashboard",
    "Session",
    "Admin",
    "Database",
    "Feed",
    "Settings",
  ];

  const socialTitles = ["Instagram", "Twitter", "GitHub"];

  const actionIcons = useMemo(() => {
    return [
      <AccountCircleIcon key="accountCircleIcon" />,
      <SpeedIcon key="speedIcon" />,
      <AccessTimeIcon key="accessTimeIcon" />,
      <SupervisorAccountIcon key="supervisorAccountIcon" />,
      <StorageIcon key="storageIcon" />,
      <RssFeedIcon key="rssFeedIcon" />,
      <SettingsIcon key="settingsIcon" />,
    ];
  }, []);

  const socialIcons = useMemo(() => {
    return [
      <InstagramIcon key="instagramIcon" />,
      <TwitterIcon key="twitterIcon" />,
      <GitHubIcon key="githubIcon" />,
    ];
  }, []);

  const handleActionIconClicked = useMemo(
    () => [
      () => history.push("/account"),
      () => history.push("/dashboard"),
      () => history.push("/sessions"),
      () => history.push("/admin"),
      () => history.push("/dashboard"),
      () => history.push("/dashboard"),
      () => history.push("/dashboard"),
    ],
    [history]
  );

  const handleSocialIconClicked = useMemo(
    () => [
      () => openSocial("https://www.instagram.com/sufst"),
      () => openSocial("https://twitter.com/sufst"),
      () => openSocial("https://github.com/orgs/sufst"),
    ],
    []
  );

  const onIconClick = useCallback(
    (index) => {
      if (index < handleActionIconClicked.length) {
        handleActionIconClicked[index]();
      }
    },
    [handleActionIconClicked]
  );

  const onSocialClick = useCallback(
    (index) => {
      if (index < handleSocialIconClicked.length) {
        handleSocialIconClicked[index]();
      }
    },
    [handleSocialIconClicked]
  );

  const openSocial = (url: string) => {
    const win = window.open(url, "_blank");
    win?.focus();
  };

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
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {actionTitles.map((text, index) => (
            <ListItem button key={text} onClick={() => onIconClick(index)}>
              <ListItemIcon>{actionIcons[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {socialTitles.map((text, index) => (
            <ListItem button key={text} onClick={() => onSocialClick(index)}>
              <ListItemIcon>{socialIcons[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <InstallPwaListItem key={"install"} />
      </Drawer>
    </div>
  );
};

export default AppSideBar;
