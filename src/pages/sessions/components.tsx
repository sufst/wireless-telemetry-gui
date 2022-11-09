import { useStyles } from "./styles";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@material-ui/core';
import { SessionsGetResponse } from "types/api/api";
import { v4 } from 'uuid';
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { sessionSlice } from "redux/slices/sessions";

const SessionsTable = () => {
    const classes: ClassNameMap = useStyles();
    const sessionData = sessionSlice;
    const sessionEntries = Object.entries(sessionData);
    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
                <SessionsTableHead />
                <TableBody>
                    {sessionEntries.map((session) => (
                        <SessionsTableRow sessionData={session} key={v4()} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const SessionsTableRow = (props: { sessionData: SessionsGetResponse }) => {
    const classes = useStyles();
    const sessionData = props.sessionData;
    //const createdAt = new Date(sessionData.creation!! * 1000).toLocaleString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' });
    return (
        <TableRow>
            <TableCell>
                <div className={classes.createdAt}>{sessionData.name}</div>
            </TableCell>

            <TableCell>
                <div className={classes.createdAt}>{sessionData.status}</div>
            </TableCell>

            <TableCell>
                <div className={classes.createdAt}>{sessionData.createdAt}</div>
            </TableCell>

            <TableCell>
                <div className={classes.createdAt}>{sessionData.actions}</div>
            </TableCell>
        </TableRow>
    );
};

const SessionsTableHead = () => {
    const classes = useStyles();
    return (
        <TableHead>
            <TableRow>
                <TableCell className={classes.tableHeaderCell}>Name</TableCell>
                <TableCell className={classes.tableHeaderCell}>Status</TableCell>
                <TableCell className={classes.tableHeaderCell}>Creation Date</TableCell>
                <TableCell className={classes.tableHeaderCell}>Actions</TableCell>
            </TableRow>
        </TableHead>
    );
};

export default SessionsTable;
