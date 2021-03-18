import React from 'react';
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
import RESTfulBackendSocket from "./restfulbackendsocket"

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
    const classes = useStyles()

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

export default class AppSignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            onPage: "signIn"
        };

        this.pages = {
            signIn: <SignIn onSubmit={(event) => this.onSignInSubmit(event)} onCreateAccount={(event) => this.onCreateAccount(event)}/>,
            createAccount: <CreateAccount onSubmit={(event) => this.onCreateAccountSubmit(event)} />
        };

        this.onAuthUser = props.onAuthUser;
        this.username = undefined;

        this.restfulBackendSocket = new RESTfulBackendSocket();
        this.restfulBackendSocket.open().catch((error) => console.error(error.message));
    }

    onAuthorizeUserResponse(result) {
        console.log("User auth? " + result);

        if (result) {
            this.onAuthUser(this.username);
        }
    }

    onCreateAccountResponse(result) {
        console.log("Account created? " + result);

        if (result) {
            this.setState({onPage: "signIn"});
        }
    }

    onCreateAccountSubmit(event) {
        event.preventDefault();
        let username = event.target.username.value;
        let password = event.target.password.value;

        this.restfulBackendSocket.requestCreateUser(username, password)
        .then((response) => this.onCreateAccountResponse(response.result));
    }

    onSignInSubmit(event) {
        event.preventDefault();
        this.username = event.target.username.value;
        let password = event.target.password.value;

        this.restfulBackendSocket.requestUserAuth(this.username, password)
        .then((response) => this.onAuthorizeUserResponse(response.result));
    }

    onCreateAccount(event) {
        this.setState({onPage: "createAccount"});
    }

    render() {
        return this.pages[this.state.onPage];
    }
}