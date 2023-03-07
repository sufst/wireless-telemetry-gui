/*
    Southampton University Formula Student Team
    Copyright (C) 2022 SUFST

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

import { useCallback, useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "../dashboard/session/styles";
import { getAllSessions } from "redux/slices/sessions";
import { SessionTable, SessionPaper } from "./components";
import { showAlert } from "redux/slices/alert";
import { createAlert } from "modules/alert/alert";

export const SessionContainer = () => {

    const dispatch = useDispatch();

    const classes = useStyles(); 
    /*
    const [sessionData, setSessionData] = useState({})

    const fetchAllSessions = () => getAllSessions();

    useEffect(() => {
        fetchAllSessions(); 
    },[fetchAllSessions])
*/
    dispatch(getAllSessions());
    const sessionData = useSelector(state => state.sessionList);
    return (
        <>
            <Paper className={classes.rootPaper}>
                {/* TODO: Loading logic needs to go back in */}
                {/* <>
                    {!isLoading.sessions && (
                        <SessionTable sessionData={sessionData}/>
                    ) || (
                        <LinearProgress />
                    )}
                </> */}
                <SessionPaper />
                <SessionTable sessionData={sessionData} />
            </Paper>
        </>
    )
}
