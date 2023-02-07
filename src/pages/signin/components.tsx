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
  Avatar,
  Button,
  TextField,
  Link,
  Box,
  Typography
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  useStyles
} from './styles';

export const LoginFooter: React.FC = () => {
  return (
    <Box mt={4} >
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://sufst.co.uk/">
             SUFST
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
};

export const LoginHeader: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon className={classes.lockIcon}/>
      </Avatar>
      <Typography component="h1" variant="h5">
             Please Login In
      </Typography>
    </>
  );
};

export const UsernameField: React.FC = () => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="username"
      label="Username"
      autoComplete="root"
      autoFocus
    />
  );
};

export const PasswordField: React.FC = (props: { label: string; id: string }) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      label={props.label}
      type="password"
      id={props.id}
      autoComplete="current-password"
    />
  );
};

export const LoginButton: React.FC = (props: { text: string }) => {
  const classes = useStyles();

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
    >
      {props.text}
    </Button>
  );
};
