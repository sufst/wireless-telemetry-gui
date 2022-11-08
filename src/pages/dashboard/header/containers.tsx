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
import React, { useCallback } from 'react';
import Tab from '@material-ui/core/Tab';
import {
	SessionContainer
} from '../session/containers';
import RealtimeSensorsGroupContainer from 'modules/realtimegraphs/realtimegraphs';
import {
	v4
} from 'uuid';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import Dash from '../dash/container';

export const DashboardHeader = () => {
	// Tabs
	const viewTabs = React.useRef([
		[<Dash key={v4()} />, <Tab key={v4()} label = "Dash"/>],
		[<SessionContainer key={v4()} />, <Tab key={v4()} label = "Session"/>]
	]);

	const tabNames = React.useRef(['Dash', 'Session']);

	const selectGroups = (state: RootState) => state.sensors.groups;
	const groups = useSelector(selectGroups);

	const groupNames = Object.keys(groups);
	const newTabNames = groupNames.filter(name => !tabNames.current.includes(name));
	const newViewTabs = newTabNames.map(tabName => [<GroupTab key={v4()} group={tabName}/>, <Tab key={v4()} label={tabName}/>]);
	viewTabs.current.push(...newViewTabs);
	tabNames.current.push(...newTabNames);

	const [selectedTab, selectTab] = React.useState(0);
	const onTabChange = useCallback((event, newIndex) => {
		selectTab(newIndex);
	}, []);

	return (
		<div>
			<Tabs variant="scrollable" scrollButtons="auto" value={selectedTab} onChange={onTabChange}>
				{viewTabs.current.map(x => x[1])}
			</Tabs>
			{viewTabs.current[selectedTab][0]}
		</div>
	);
};

const GroupTab = (props: { group: string }) => {
	return (
		<RealtimeSensorsGroupContainer key={v4()} name={props.group}/>
	);
};
