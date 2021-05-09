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

import React, { useRef } from 'react';
import {
    BrowserRouter as Router, 
    Route, 
    Switch, 
    Redirect 
} from "react-router-dom";
import { Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { Dashboard } from "pages/dashboard/index";
import Account from 'pages/account/';
import { SignIn } from "pages/signin/index";
import AppNavigation from "modules/navigation/navigation";
import { useStyles } from "./styles";
import Alert from 'modules/alert/alert';
import { loginUser } from 'redux/slices/user';
import type { RootState } from 'redux/store';


const AppRouterSwitch = () => {
    const classes = useStyles();

    const selectUser = (state: RootState) => state.user;
    const user = useSelector(selectUser); 

    const { username } = user; 

    return (
        <Switch>
            <Route path="/" exact>
                <Redirect to="/dashboard"/>
            </Route>
            <Route path="/signin">
                {/* TODO: Determine where to go */} 
                <SignIn />
            </Route>
            <Route path={"/dashboard"} exact>
                <Paper className={classes.viewPaper}>
                    <Alert /> 
                    <Dashboard/>
                </Paper> 
            </Route>
            <Route path={"/account"} exact>
                <Paper className={classes.viewPaper}>
                    <Alert /> 
                    {console.log(username)}
                    {username === undefined || username === 'anonymous' ? <SignIn /> : <Account/> }
                </Paper> 
            </Route>
            <Route path="*">
                <Redirect to="/" />
            </Route>
        </Switch>
    )
}

const AnonymousLogin = () => {
    const dispatch = useDispatch();

    const username = "anonymous"
    const password = "anonymous"

    dispatch(loginUser( { username, password } ))
}

export function AppContainer() {    
    const logginIn = useRef(true);

    if(logginIn.current)
    {
        AnonymousLogin();
        logginIn.current = false;
    }

    return (
        <Router>
            <AppNavigation />
            <AppRouterSwitch />
        </Router>
    );
} 