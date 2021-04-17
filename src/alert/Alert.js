// Material UI Labs Imports
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useContext } from 'react';
import { useSelector } from 'react-redux';

/**
 * Alert Types - (severity) - as specified from MUI Labs - Name of type to be specified
 * 
 * "info": Blue Background in the Alert
 * "error": Red Background in the Alert 
 * "warning": Yellow Background in the Alert
 * "success": Green Background in the Alert
 */

function AppAlert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Alert = (props) => {
    const alert = useSelector((state => state.alert)); 

    // Destructuring the values of the alert from the context 
    const { text, type, timeout, level } = alert; 

    const configureAlert = () => {
        if (type === 'snack') {
            return (
                <Snackbar open={ type == "snack" } autoHideDuration={timeout}>
                    <AppAlert severity={level}>
                        {text ?? ''}
                    </AppAlert>
                </Snackbar>
            )
        } else {
            return (
                <MuiAlert elevation={6} variant="filled" {...props} severity={level}>
                    {text ?? ''}
                </MuiAlert>
            )
        }
    }

    return (
        type !== undefined && (
            <>
               { configureAlert() }
            </>
        )
    )
}

export default Alert; 