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

import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	rootPaper: {
		flexGrow: 1,
		padding: '1rem',
		marginBottom: '1rem',
		marginTop: '1rem',
		background: '#292929'
	},
	gridContainer: {
		marginBottom: '0.5rem'
	},
	item: {
		height: '130px'
	},
	box: {
		color: 'white',
		overflow: 'hidden',
		height: '120px',
		fontSize: '20px',
		borderRadius: '10px',
		backgroundColor: 'green',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	status: {
		fontWeight: 'bold'
	},
	currentTimeText: {
		fontSize: '20px',
		margin: '0',
		marginBottom: '0.5rem',
		padding: '0'
	},
	time: {
		fontWeight: 'bold'
	},
	startSessionBtn: {
		color: 'red'
	},
	sensorBox: {
		color: 'white',
		overflow: 'hidden',
		height: '120px',
		textAlign: 'center',
		fontSize: '20px',
		borderRadius: '10px',
		backgroundColor: 'black',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	sessionButtonStartBox: {
		color: 'white',
		overflow: 'hidden',
		height: '80px',
		textAlign: 'center',
		fontSize: '20px',
		fontWeight: 'bold',
		borderRadius: '10px',
		backgroundColor: 'green',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,

		'&:hover': {
			cursor: 'pointer',
			filter: 'brightness(125%)'
		}
	},
	sessionButtonStartBoxDisabled: {
		color: 'white',
		overflow: 'hidden',
		height: '80px',
		textAlign: 'center',
		fontSize: '20px',
		fontWeight: 'bold',
		borderRadius: '10px',
		backgroundColor: 'darkGray',
		opacity: '60%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	sessionButtonStopBox: {
		color: 'white',
		overflow: 'hidden',
		height: '80px',
		textAlign: 'center',
		fontSize: '20px',
		fontWeight: 'bold',
		borderRadius: '10px',
		backgroundColor: 'darkOrange',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,

		'&:hover': {
			cursor: 'pointer',
			filter: 'brightness(125%)'
		}
	},
	sessionButtonStopBoxDisabled: {
		color: 'white',
		overflow: 'hidden',
		height: '80px',
		textAlign: 'center',
		fontSize: '20px',
		fontWeight: 'bold',
		borderRadius: '10px',
		backgroundColor: 'darkGray',
		opacity: '60%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	currentSessionBox: {
		color: 'white',
		overflow: 'hidden',
		height: '80px',
		textAlign: 'center',
		fontSize: '20px',
		fontWeight: 'bold',
		borderRadius: '10px',
		backgroundColor: 'gray',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	sessionStatusText: {
		color: 'red',
		fontWeight: 'bold',
		margin: '0.5rem 0',
		fontSize: '20px'
	},
	sensorsText: {
		margin: '0',
		marginBottom: '0.5rem',
		fontSize: '20px'
	},
	sensorLastValue: {
		fontWeight: 'bold'
	}
}));
