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
} from "../signin/index";
import {
    BrowserRouter as Router, Route, Switch, Redirect 
} from "react-router-dom";
import {
    useUser
} from "../store/user";
import {
    Dashboard
} from "../dashboard/index";
import AppNavContainer from "../navigation/container";
import {
    Paper
} from '@material-ui/core';
import {
    useStyles
} from "./styles";
import Account from '../account';
import Alert from '../alert/Alert';
import {
    logIn, 
    sio
} from "../backend/backend"; 
import {
    buildConfigStoreFromSensorConfig,
    buildDataStoreFromSensorConfig,
    useSensorConfigDispatch,
    useSensorDataDispatch,
} from "../store/sensors";

const AppRouterSwitch = () => {
    const user = useUser();
    const classes = useStyles();

    return (
        <Switch>
            <Route path="/" exact>
                {/* { user.username !== undefined ? <Redirect to="/dashboard" /> : <Redirect to="/signin" /> } */}
                {<Redirect to="/dashboard"/>}
            </Route>
            <Route path="/signin">
                {/* { user.username !== undefined ? <Redirect to={"/dashboard/" + user.username} /> : <SignIn /> } */}
                <SignIn />
            </Route>
            {/*<Route path={"/dashboard/" + user.username} exact>
                <Dash />
            </Route> */}
            <Route path={"/dashboard"} exact>
                <Paper className={classes.viewPaper}>
                    <Alert className={classes.alert} /> 
                    <Dashboard/>
                </Paper> 
            </Route>
            <Route path={"/account"} exact>
                <Paper className={classes.viewPaper}>
                    <Alert className={classes.alert} /> 
                    {/* This needs to change to === 'guest' when the default user is the guest */}
                    {user.username === undefined ? <SignIn /> : <Account/> }
                </Paper> 
            </Route>
            <Route path="*">
                {/* <Redirect to="/signin" /> */}
                <Redirect to="/" />
            </Route>
        </Switch>
    )
}

function AnonymousLogin() {
    const configDispatch = useSensorConfigDispatch();
    const dataDispatch = useSensorDataDispatch();

    logIn("anonymous", "anonymous").then(() => {
        sio.on("meta", message => {
            const meta = JSON.parse(message);
            console.log(meta);
            const configBuild = buildConfigStoreFromSensorConfig(meta);
            const dataBuild = buildDataStoreFromSensorConfig(meta);
            configDispatch({type: "build", build: configBuild});
            dataDispatch({type: "build", build: dataBuild});
            }
        )
        sio.on("data", message => {
            const data = JSON.parse(message);
    
            console.log(data);
    
            dataDispatch({type: "bulk_update", updates: data});
        });
    })
    .catch(error => {
        console.error(error);
        AnonymousLogin();
    });
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
            <AppNavContainer />
            <AppRouterSwitch />
        </Router>
    );
} 