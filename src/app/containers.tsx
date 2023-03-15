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
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Material UI Imports
import { Paper } from "@material-ui/core";

// Component Imports
import { Dashboard } from "pages/dashboard/index";
import Admin from "pages/admin/index";
import Account from "pages/account/";
import { SignIn } from "pages/signin/index";
import AppNavigation from "modules/navigation/navigation";
import { Register } from "pages/registration";
import Alert from "modules/alert/alert";
import Sessions from "pages/sessions";

// Styles
import { useStyles } from "./styles";

// Redux Imports
import { loginUser } from "redux/slices/user";
import type { RootState } from "redux/store";

const AppRouterSwitch: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user.username === undefined) {
      const username = "anonymous";
      const password = "anonymous";
      dispatch(loginUser({ username, password }));
    } else {
      history.push("/");
    }
  }, [user, dispatch, history]);
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/dashboard" />
      </Route>
      <Route path="/login" exact>
        <Paper className={classes.viewPaper}>
          <Alert />
          <SignIn />
        </Paper>
      </Route>
      <Route path="/register" exact>
        <Paper className={classes.viewPaper}>
          <Alert />
          <Register />
        </Paper>
      </Route>
      <Route path="/dashboard" exact>
        <Paper className={classes.viewPaper}>
          <Alert />
          <Dashboard />
        </Paper>
      </Route>
      <Route path="/account" exact>
        <Paper className={classes.viewPaper}>
          <Alert />
          <Account />
        </Paper>
      </Route>
      <Route path="/admin" exact>
        <Paper className={classes.viewPaper}>
          <Alert />
          <Admin />
        </Paper>
      </Route>
      <Route path="/sessions" exact>
        <Paper className={classes.viewPaper}>
          <Alert />
          <Sessions />
        </Paper>
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export const AppContainer: React.FC = () => {
  return (
    <Router>
      <AppNavigation />
      <AppRouterSwitch />
    </Router>
  );
};
