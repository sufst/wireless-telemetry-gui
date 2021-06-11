/*
    Southampton University Formula Student Team
    Copyright (C) SUFST

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

import { Box, Grid, Paper } from "@material-ui/core";
import { useStyles } from "./styles";


const Dash = () => {
    const classes = useStyles(); 

    return (
        <Paper className={classes.rootPaper}>
            <Grid container spacing={3} className={classes.gridContainer}>
                <Grid item xs={3} className={classes.item}>
                    <Box className={classes.box}>ECU</Box>
                </Grid>
                <Grid item xs={3} className={classes.item}>
                    <Box className={classes.box}>ENGINE</Box>
                </Grid>
                <Grid item xs={3} className={classes.item}>
                    <Box className={classes.box}>BATTERY</Box>
                </Grid>
                <Grid item xs={3} className={classes.item}>
                    <Box className={classes.box}>LOGGING</Box>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Dash; 
