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
import React, {
    useCallback
} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { 
    useStyles 
} from "./styles";
import { 
    WelcomeMessage, 
    SignInAvatar, 
    UsernameField,
    PasswordField,
    SubmitButton,
    CreateAccountButton,
    FooterMessage
} from "./components";

// import { usersCreate } from "modules/api/users";

import { useDispatch } from 'react-redux';
// import { loginUser, setUser } from 'redux/slices/user';
import { loginUser } from 'redux/slices/user';
// import { LoginUserAction } from "redux/typing";


export const SignInContainer = () => {
    const classes = useStyles();

    console.log('SIGN IN');

    const dispatch = useDispatch()

    const onSignInSubmit = useCallback((event) => {
        event.preventDefault();

        let username = event.target.username.value;
        let password = event.target.password.value;

        dispatch(loginUser( { username, password } ));
    }, [dispatch]);

    return (
        // Seems typescript doesn't understand component and maxWidth
        // @ts-ignore
        <Container componenet="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <SignInAvatar />
                <WelcomeMessage message="Please Sign in"/>
                <form className={classes.form} onSubmit={onSignInSubmit}>
                    <UsernameField />
                    <PasswordField />
                    <SubmitButton text="Sign In"/>
                    <CreateAccountButton onClick={() => console.log('Redict to register')} />
                </form>
            </div>
            <FooterMessage />
        </Container>
    );
}

export const CreateAccountContainer = () => {
    const classes = useStyles()

    // const dispatch = useDispatch(); 
        
    const onusersCreateSubmit = useCallback((event) => {
        event.preventDefault();
    
    //     // let username = event.target.username.value;
    //     // let password = event.target.password.value;

    //     // TODO: Create user needs to be a slice

    //     // const createAccountPayload: LoginUserAction = {
    //     //     username,
    //     //     password
    //     // }
        
    //     // TODO: Create user needs to be a slice
    //     // usersCreate(username, password, {})
    //     // .then(() => dispatch(setUser(createAccountPayload)))
    //     // .catch((error: Error) => console.error(error));
    }, []);

    return (
        // Seems typescript doesn't understand component and maxWidth
        // @ts-ignore
        <Container componenet="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <SignInAvatar />
                <WelcomeMessage message="Create Account"/>
                <form className={classes.form} onSubmit={onusersCreateSubmit}>
                    <UsernameField />
                    <PasswordField />
                    <SubmitButton text="Create Account"/>
                </form>
            </div>
            <FooterMessage />
        </Container>
    );
}