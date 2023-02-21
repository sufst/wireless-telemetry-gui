import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme) => ({
    sessionsContainer: {
        margin: '10px 10px',
        marginBottom: '3rem'
    },
    table: {
        minWidth: 650,
    },
    tableContainer: {
        borderRadius: 5,
        maxWidth: '90%',
        background: '#292929'
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        fontSize: '1rem',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        marginLeft: '1.2rem',
        paddingTop: '0.5rem',
        color: 'white'
    },
    department: {
        color: 'lightGray'
    },
    createdAt: {
        color: 'lightGray'
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
}));