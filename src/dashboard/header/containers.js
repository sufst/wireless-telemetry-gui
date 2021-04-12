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

import Tabs from '@material-ui/core/Tabs';
import React, {useCallback, useEffect} from 'react';
import Tab from '@material-ui/core/Tab';
import {
    Session
} from "../session/containers"
// import { useGroups, useGroupSensors, useSensorConfigDispatch } from '../../store/sensors';
import {GroupContainer} from '../../realtimegraphs/containers';
import {
    useGroups
} from "../../store/sensors";
import {
    v4 
}from 'uuid';

export function DashboardH(props)
{
    const viewTabs = React.useRef([[<Session key={v4()} />, <Tab key={v4()} label = "Session"/>], [<></>, <Tab key={v4()} label = "Dash"/>]]);
    const tabNames = React.useRef(["Session", "Dash"]);  

    const groups = useGroups();
    useEffect(() => {
        const groupNames = Object.keys(groups);
        const newTabNames = groupNames.filter(x => !tabNames.current.includes(x));
        const newViewTabs = newTabNames.map(x => [<GroupTab key={v4()} group={x}/>,<Tab key={v4()} label={x}/>]);
        viewTabs.current.push(...newViewTabs);
        tabNames.current.push(...newTabNames);

    }, [groups]);

    const [selectedTab, selectTab] = React.useState(0);
    const onTabChange = useCallback((event, newIndex) => {
        selectTab(newIndex);
    }, []);

    return(
        <div>
            <Tabs variant="scrollable" scrollButtons="auto" value={selectedTab} onChange={onTabChange}>
                {viewTabs.current.map(x => x[1])}
            </Tabs>
            {viewTabs.current[selectedTab][0]}
        </div> 
    );

}

export function GroupTab(props)
{
    return(
        <GroupContainer key={v4()} name={props.group}/>
    );
}