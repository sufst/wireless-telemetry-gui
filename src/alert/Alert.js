// Material UI Labs Imports
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useState } from 'react';

// Context Imports
import { useAlert } from '../store/alert';

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
    const alert = useAlert(); 

    const { type, text, timeout } = alert; 

    return (
        type !== undefined && (
            <>
                <MuiAlert elevation={6} variant="filled" {...props} severity={type}>
                    {text ?? ''}
                </MuiAlert>
                <Snackbar open={ type !== undefined } autoHideDuration={timeout}>
                    <AppAlert severity={type}>
                        {text ?? ''}
                    </AppAlert>
                </Snackbar>
            </>
        )
    )
}

export default Alert; 