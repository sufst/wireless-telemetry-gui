/*
    Southampton University Formula Student Team
    Copyright (C) 2021 SUFST

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

// React - Redux Imports
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from 'redux/store';

// Components Impors
import AppNavigationBar from './appbar';
import AppSideBar from './sidebar';

// Material UI Imports
import { useStyles } from './styles';

/**
 * A Container that holds all the logic & views for the main AppBar and the AppSideBar
 */
const AppNav: React.FC = () => {
	const classes = useStyles();
	const history = useHistory();

	const user = useSelector((state: RootState) => state.user);

	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = useCallback(() => {
		setOpen(true);
	}, []);

	const handleDrawerClose = useCallback(() => {
		setOpen(false);
	}, []);

	const handleAccountClick = useCallback(() => {
		history.push('/account');
	}, [history]);

	return (
		<div className={classes.navigationRoot}>
			<AppNavigationBar open={open} handleDrawerOpen={handleDrawerOpen} onAccountClick={handleAccountClick} user={user}/>
         SideBar
			<AppSideBar open={open} handleDrawerClose={handleDrawerClose} />
		</div>
	);
};

export default AppNav;
