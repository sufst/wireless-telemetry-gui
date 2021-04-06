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
import React from 'react';
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
    Dash
} from "../dash/index";

export function AppContainer(props) {
    const user = useUser();
    
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    { user.username !== undefined ? <Redirect to="/dashboard" /> : <Redirect to="/signin" /> }
                </Route>
                <Route path="/signin">
                    { user.username !== undefined ? <Redirect to={"/dashboard/" + user.username} /> : <SignIn /> }
                </Route>
                <Route path={"/dashboard/" + user.username} exact>
                    <Dash />
                </Route>
                <Route path="*">
                    <Redirect to="/signin" />
                </Route>
            </Switch>
        </Router>
    );
} 