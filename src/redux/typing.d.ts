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


export type AlertState = {
    timeout?: AlertTimeout,
    level?: AlertLevel,
    type?: AlertType,
    text?: AlertText
};

export type ShowAlertAction = Alert;

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

export type UpdateSensorsMetaAction = {
    sensor: string,
    key: string,
    value: any
};

export type UserMeta = {
    dept?: string,
    lastLogin?: string,
    createdAt?: string    
};

export type UserPrivilege = 'Anon' | 'Basic' | 'Admin' | 'Developer';

export type UserDepartment = 'Electronics' | 'Operations' | 'Power-train' | 'Vehicle Performance' | 'Race Engineering' | 'Aerodynamics' | 'Tier 1' | 'NON SPECIFIED'

export type SetUserAction = {
    username: string,
    accessToken: string,
    creation: number,
    privilege: UserPrivilege,
    department: UserDepartment,
    meta: UserMeta
};

export type RegisterUserAction = {
    username: string, 
    password: string, 
    privilege: UserPrivilege, 
    department: UserDepartment,
}

export type LoginUserAction = {
    username: string,
    password: string
};

export type UserState = {
    username?: string,
    accessToken?: string,
    privilege?: UserPrivilege,
    creation?: number,
    department: UserDepartment,
    meta: UserMeta
};

export type SessionState = {
    sessionName: string
}

export type StartStopSessionAction = {
    name: string
}