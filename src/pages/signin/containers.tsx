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


import { useDispatch } from 'react-redux';

import { loginUser } from 'redux/slices/user';
import { LoginHeader, LoginFooter, LoginButton, UsernameField, PasswordField, RegisterButton } from './components';

import { useStyles } from "./styles";
import { useHistory } from 'react-router';

const LoginContainer = () => {
    const classes = useStyles();
 
    const dispatch = useDispatch(); 
    const history = useHistory();
 
    const onLoginSubmit = useCallback((event) => {
       event.preventDefault();
 
       let username = event.target.username.value;
       let password = event.target.password.value;
 
       dispatch(loginUser( { username, password } ));
    }, [dispatch]);

    const onRegisterClick = useCallback((event) => {
      history.push('/register');
    }, [history])
 
    return (
       <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
             <LoginHeader />
             <form className={classes.form} noValidate onSubmit={onLoginSubmit}>
                <UsernameField /> 
                <PasswordField label={'Password'} />
                <div className={classes.btnContainer}>
                   <LoginButton text='Login' />
                   <RegisterButton text='Register New Account' onClick={onRegisterClick}/>
                </div>
             </form>
          </div>
          <LoginFooter />
       </Container>
    );
 }
 
 export default LoginContainer;