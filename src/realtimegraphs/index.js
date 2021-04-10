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
import React, { useMemo } from 'react';
import { 
    useGroups 
} from "../store/sensors";
import { 
    Grid 
} from '@material-ui/core';
import {
    v4 
} from 'uuid';
import { 
    GroupContainer 
} from "./containers";

export function RealTimeGraphs(props) {
    const groups = useGroups();

    // useMemo is used because otherwise the GroupContainers will be re-rendered
    // on every render or change (it should only be computed when useGroups update so 
    // useMemo is perfect for this).

    // NOTE: This technique is used a lot in this module!
    const groupContainers = useMemo(() => {
        const containers = [];
        
        for (const group in groups) {
            containers.push(
                <Grid item key={v4()} xs={6}>
                    <GroupContainer key={v4()} name={group} />
                </Grid>
            );
        }

       return containers;
    }, [groups])

    return (
        <Grid container key={v4()} spacing={3}>
            {groupContainers}
        </Grid>
    );
}