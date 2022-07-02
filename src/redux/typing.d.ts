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

import type { Alert, AlertLevel, AlertText, AlertTimeout, AlertType } from "modules/alert/typing";

export type SensorData = {
    epoch: number,
    value: number
};

export type SensorMeta = { 
    [entry: string ]: any 
};

export type Sensor = {
    meta: SensorMeta,
    data: Array<SensorData>,
    isDisplay: boolean
};

export type SensorsState = {
    sensors: {
        [sensor: string]: Sensor
    },
    groups: {
        [sensor: string]: Array<string>
    }, 
    sensorMetadata: SensorMeta
};

export type SensorsMeta = {
    [sensor: string]: SensorMeta
};

export type BuildSensorsFromMetaAction = SensorsMeta;

export type InsertSensorsBulkDataAction = {
    [sensor: string]: Array<SensorData>
};


export type SessionState = {
    sessionName: string,
    sessionDriver: string, 
    sessionConditions: string,
    sessionSensors: Array<string>,
    sessionSensorGroups: Array<string>,
    isRunning: boolean,
}

