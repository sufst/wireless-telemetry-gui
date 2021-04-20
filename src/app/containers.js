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
    SignIn
} from "../pages/signin/index";
import {
    BrowserRouter as Router, Route, Switch, Redirect 
} from "react-router-dom";
import {
    Dashboard
} from "../pages/dashboard/index";
import AppNavigation from "../modules/navigation/navigation";
import {
    Paper
} from '@material-ui/core';
import {
    useStyles
} from "./styles";
import Account from '../pages/account/';
import Alert from '../modules/alert/alert';
import { 
    useDispatch 
} from 'react-redux';
import { useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/user';

const AppRouterSwitch = () => {
    const classes = useStyles();

    const user = useSelector((state => state.user)); 

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
                    <Alert className={classes.alert} /> 
                    <Dashboard/>
                </Paper> 
            </Route>
            <Route path={"/account"} exact>
                <Paper className={classes.viewPaper}>
                    <Alert className={classes.alert} /> 
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

export function AppContainer(props) {    
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