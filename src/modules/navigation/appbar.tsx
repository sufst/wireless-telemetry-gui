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
import React, { useCallback } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import clsx from "clsx";

// Material UI Imports
import {
  AppBar,
  Button,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

// Material UI Icon Imports
import MenuIcon from "@mui/icons-material/Menu";

// Styles
import { useStyles } from "./styles";

// Redux Imports
import { logoutUser } from "redux/slices/user";
import { UserState } from "types/models/user";

interface NavigationBarProps {
  handleDrawerOpen: () => void;
  open: boolean;
  onAccountClick: () => void;
  user: UserState;
}

/**
 * A Component that holds the top navigation bar of the application.
 */
const AppNavigationBar: React.FC<NavigationBarProps> = ({
  handleDrawerOpen,
  open,
  onAccountClick,
  user,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const username = user.username;

  const loginLogoutButtonText = useCallback(() => {
    if (username === "anonymous" || username === undefined) {
      return "Login";
    }

    return "Logout";
  }, [username]);

  const onLoginLogoutButtonClick = useCallback(() => {
    if (username === "anonymous" || username === undefined) {
      history.push("/login");
    } else {
      dispatch(logoutUser());
    }
  }, [username, history, dispatch]);

  return (
    <div>
      <CssBaseline />
      <AppBar
        enableColorOnDark
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
            size="large">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            SUFST Telemetry
          </Typography>
          <Typography className={classes.usernameLabel} variant="h6">
            {username === "anonymous" ? "" : username}
          </Typography>
          <Button
            variant="contained"
            disableElevation
            color="secondary"
            onClick={onLoginLogoutButtonClick}
            className={
              username === "anonymous"
                ? classes.loginButton
                : classes.logoutButton
            }
          >
            {loginLogoutButtonText()}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppNavigationBar;
