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
import React, {useCallback, useRef} from 'react';
import Tab from '@material-ui/core/Tab';
import {
    Session
} from "../session/containers"

export function DashboardH(props)
{
    const views = useRef([<Session/>, <></>]);
    const tabs = useRef([<Tab label = "Session"/>, <Tab label = "Dash"/>]);
    const [selectedTab, selectTab] = React.useState(0);
    const [selectedTabView, setSelectedTabView] = React.useState(<Session/>);
    const onTabChange = useCallback((event, newIndex) => {
        selectTab(newIndex);
        setSelectedTabView(views.current[newIndex]);
    }, []);

    return(
        <div>
            <Tabs value={selectedTab} onChange={onTabChange}>
                {tabs.current}
            </Tabs>
            {selectedTabView}
        </div> 
    )

}