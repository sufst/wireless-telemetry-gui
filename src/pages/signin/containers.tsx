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

import { useCallback } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import { useDispatch } from 'react-redux';

import { loginUser } from 'redux/slices/user';
import { LoginHeader, LoginFooter, LoginButton, UsernameField, PasswordField } from './components';

import { useStyles } from './styles';

const LoginContainer = () => {
	const classes = useStyles();

	const dispatch = useDispatch();

	const onLoginSubmit = useCallback((event) => {
		event.preventDefault();

		const username = event.target.username.value;
		const password = event.target.password.value;

		dispatch(loginUser({ username, password }));
	}, [dispatch]);

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<LoginHeader />
				<form className={classes.form} noValidate onSubmit={onLoginSubmit}>
					<UsernameField />
					<PasswordField label={'Password'} id={'password'}/>
					<div className={classes.btnContainer}>
						<LoginButton text='Login' />
					</div>
				</form>
			</div>
			<LoginFooter />
		</Container>
	);
};

export default LoginContainer;
