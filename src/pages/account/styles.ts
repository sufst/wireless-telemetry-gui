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

// Material UI Imports
import { makeStyles } from '@material-ui/core/styles';
import { PrivilegeColor, PrivilegeToColors } from 'types/models/ui-types';
import { UserPrivilege } from 'types/models/user';

const privilegeToColors: PrivilegeToColors = {
	Anon: 'gray',
	Admin: 'red',
	Basic: 'gray',
	Developer: 'green'
};

const privilegeFont = (privilege?: UserPrivilege) => {
	if (privilege === 'Admin' || privilege === 'Developer') {
		return 700;
	}

	return 400;
};

const getPrivilegeColor = (privilege?: UserPrivilege): PrivilegeColor => {
	const priv: keyof PrivilegeToColors = privilege ?? 'Basic';

	return privilegeToColors[priv];
};

export const subheaderStyle = (privilege?: UserPrivilege) => {
	return {
		style: {
			color: getPrivilegeColor(privilege),
			fontWeight: privilegeFont(privilege)
		}
	};
};

export const avatarStyle = (privilege?: UserPrivilege) => {
	return {
		backgroundColor: getPrivilegeColor(privilege),
		color: 'white'
	};
};

export const useStyles = makeStyles((theme) => ({
	cardRoot: {
		marginTop: '1em',
		backgroundColor: '#292929'
	},
	btn: {
		marginTop: '20px',
		backgroundColor: 'red'
	},
	btn_register: {
		marginTop: '20px',
		marginLeft: '20px',
		backgroundColor: 'green'
	},
	list: {
		margin: '0px',
		paddingBottom: '0px',
		paddingTop: '0px'
	},
	line: {
		marginTop: '20px'
	}
}));
