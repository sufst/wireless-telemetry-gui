import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {logIn, createUser} from "./backend"
import { BrowserRouter as Router, Route, Switch, useRouteMatch, Redirect } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirecton: "column",
        alaignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

function SignIn(props) {
    const classes = useStyles();

    return (
        <Container componenet="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon  />
                </Avatar>
                <Typography componenet="h1" variant="h5">
                    Sign in bitch
                </Typography>
                <form className={classes.form} onSubmit={props.onSubmit}>
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="User Name"
                        autoComplete="root"
                        autoFocus
                    />
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button 
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Button 
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={props.onCreateAccount}
                    >
                        Create Account
                </Button>
                </form>
            </div>
            <Box mt={8}>
                <Typography variant="body2" color="textSecondary" align="center">
                    {"Copyright © "}
                    <Link color="inherit" href="https://github.com/sufst">
                        Nathan Rowley-Smith 
                    </Link>
                    {" "}
                    {new Date().getFullYear()}
                    {"."}
                </Typography>
             </Box>
        </Container>
    );
}

function CreateAccount(props) {
    const classes = useStyles()

    return (
        <Container componenet="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon  />
                </Avatar>
                <Typography componenet="h1" variant="h5">
                    Create Account
                </Typography>
                <form className={classes.form} onSubmit={props.onSubmit}>
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="User Name"
                        autoComplete="root"
                        autoFocus
                    />
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button 
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Create Account
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Typography variant="body2" color="textSecondary" align="center">
                    {"Copyright © "}
                    <Link color="inherit" href="https://github.com/sufst">
                        Nathan Rowley-Smith 
                    </Link>
                    {" "}
                    {new Date().getFullYear()}
                    {"."}
                </Typography>
             </Box>
        </Container>
    );
}

export default function AppSignIn(props) {   
    let match = useRouteMatch();

    const [createAccount, setCreateAccount] = useState(false);

    function onSignInSubmit(event) {
        event.preventDefault();

        let username = event.target.username.value;
        let password = event.target.password.value;
    
        logIn(username, password)
        .then(() => props.onAuthUser(username))
        .catch((error) => console.error(error));
    }
    
    function onCreateUserSubmit(event) {
        event.preventDefault();
    
        let username = event.target.username.value;
        let password = event.target.password.value;
    
        createUser(username, password)
        .then(() => setCreateAccount(false))
        .catch((error) => console.error(error));
    }

    return(
        <Switch>
            <Route path={"/signin"} exact>
                {createAccount ? <Redirect to={"/signin/createaccount"} /> : <SignIn onSubmit={(event) => onSignInSubmit(event)} onCreateAccount={() => setCreateAccount(true)} />}
            </Route>
            <Route path={"/signin/createaccount"} exact>
                {createAccount ? <CreateAccount onSubmit={(event) => onCreateUserSubmit(event)} /> : <Redirect to={"/signin"} /> }
            </Route>
            <Route path="*">
                <div>404 Not found</div>
            </Route>
        </Switch>
    )
}