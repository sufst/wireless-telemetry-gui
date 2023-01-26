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

//
// DASHBOARD
//
export type DashStatusItemColor = 'grey' | 'red' | 'green' | 'orange' | 'rgba(0, 0, 0, 0.5)';

export type DashStatusItemText = 'IDLE' | 'INACTIVE' | 'ACTIVE' | 'CONNECTED' | 'DISCONNECTED' | 'LOW' | 'HEALTHY' | ' ';

//
// User Privilege UI
//
export type PrivilegeColor = 'red' | 'gray' | 'green';

// TODO: Fix this here...
export interface PrivilegeToColors {
	[privilege: string]: PrivilegeColor;
}

//
// GRAPHS
//
export interface GraphData {
	time: string;
	value: number;
}
