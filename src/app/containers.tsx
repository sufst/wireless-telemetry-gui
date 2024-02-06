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
import { ViewPaper } from "./styles";

// Redux Imports
import { loginUser } from "redux/slices/user";
import type { RootState } from "redux/store";

const AppRouterSwitch: React.FC = () => {
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
        <ViewPaper>
          <Alert />
          <SignIn />
        </ViewPaper>
      </Route>
      <Route path="/register" exact>
        <ViewPaper>
          <Alert />
          <Register />
        </ViewPaper>
      </Route>
      <Route path="/dashboard" exact>
        <ViewPaper>
          <Alert />
          <Dashboard />
        </ViewPaper>
      </Route>
      <Route path="/account" exact>
        <ViewPaper>
          <Alert />
          <Account />
        </ViewPaper>
      </Route>
      <Route path="/admin" exact>
        <ViewPaper>
          <Alert />
          <Admin />
        </ViewPaper>
      </Route>
      <Route path="/sessions" exact>
        <ViewPaper>
          <Alert />
          <Sessions />
        </ViewPaper>
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
