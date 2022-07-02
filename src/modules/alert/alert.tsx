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


import { AlertState, AlertLevel, AlertText, AlertTimeout, AlertType } from 'types/redux/alert';
import AlertContainer from './containers';

/**
 * Alert Levels - (severity) - as specified from MUI Labs - Name of type to be specified
 * 
 * "info": Blue Background in the Alert
 * "error": Red Background in the Alert 
 * "warning": Yellow Background in the Alert
 * "success": Green Background in the Alert
 */

const Alert = () => {
    return (
        <AlertContainer />
    )
}

/**
 * Function to create a new Alert in the system
 * 
 * @param timeout the time in ms until the alert is dismissed
 * @param level the level of the alert (info, error, success, warning)
 * @param type the type of the alert (snack, alert)
 * @param text the text to be shown in the alert
 */
export const createAlert: CreateAlert = (timeout, level, type, text) => {
    return {
        timeout, 
        level,
        type,
        text
    }
}

type CreateAlert = (timeout: AlertTimeout, level: AlertLevel, type: AlertType, text: AlertText) => AlertState;

export default Alert; 
