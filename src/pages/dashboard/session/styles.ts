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

import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '0'
  },
  rootPaper: {
    flexGrow: 1,
    padding: '1rem',
    marginBottom: '1rem',
    marginTop: '1rem',
    background: '#292929'
  },
  rootPaperRunningSession: {
    flexGrow: 1,
    padding: '1rem',
    marginBottom: '1rem',
    marginTop: '1rem',
    background: 'darkBlue'
  },
  newSessionText: {
    margin: '0',
    marginBottom: '0.5rem',
    fontSize: '20px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  currentSessionTypo: {
    textAlign: 'center'
  },
  currentSessionText: {
    color: '#eee'
  },
  startStopBtn: {
    marginLeft: '1rem'
  },
  newSessionWrapper: {
    margin: '1rem 1rem 0 1rem',
    backgroundColor: '#292929'
  },
  newSessionSubmitBtn: {
    marginLeft: '0.5rem'
  },
  newSessionTextField: {
    marginBottom: '1rem',
    width: '200px'
  },
  newSessionTextFieldMargin: {
    marginLeft: '1rem',
    marginBottom: '1rem',
    width: '200px'
  },
  sessionName: {
    fontWeight: 'bold'
  },
  rootSessionPaper: {
    marginTop: '1rem'
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
  gridContainer: {
    marginBottom: '0.5rem'
  },
  formLabel: {
    paddingTop: '0.7rem',
    marginRight: '1rem'
  },
  sessionAlreadyRunningText: {
    marginTop: '-10px',
    fontWeight: 'bold',
    color: 'red',
    opacity: '70%'
  },
  sensorChooserBox: {
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
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
  }
}));
