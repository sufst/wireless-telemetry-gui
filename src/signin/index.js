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
import { useSelector } from 'react-redux';
import { 
    BrowserRouter as Router, Route, Switch, Redirect, useRouteMatch 
} from "react-router-dom"
import {
    SignInContainer,
    CreateAccountContainer
} from "./containers";

export function SignIn(props) {
    const user = useSelector((state => state.user)); 
    const match = useRouteMatch();

    return(
        <Router>
            <Switch>
                <Route path={match.url} exact>
                    {user.isCreatingAccount ? <Redirect to={match.url + "/createaccount"} /> : <SignInContainer />}
                </Route>
                <Route path={match.url + "/createaccount"}>
                    {user.isCreatingAccount ? <CreateAccountContainer /> : <Redirect to={match.url} /> }
                </Route>
                <Route path="*">
                    <div>404 Not found</div>
                </Route>
            </Switch>
        </Router>
    )
}