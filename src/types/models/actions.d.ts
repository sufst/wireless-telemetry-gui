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

import { AlertState } from "./alert";
import { UserDepartment, UserMeta, UserPrivilege } from "./user";

//
// USER
//
export interface SetUserAction {
  username: string;
  accessToken: string;
  creation: number;
  privilege: UserPrivilege;
  department: UserDepartment;
  meta: UserMeta;
}

export interface RegisterUserAction {
  username: string;
  password: string;
  privilege: UserPrivilege;
  department: UserDepartment;
}

export type UserRegister = (
  username: string,
  password: string,
  privilege: UserPrivilege,
  department: UserDepartment
) => void;

export interface LoginUserAction {
  username: string;
  password: string;
}

//
// SESSION
//
export interface StartSessionAction {
  name: string;
  driver: string;
  condition: string;
  sensors: string[];
  groups: string[];
}

export type StartSessionButtonAction = (
  name: string,
  driver: string,
  condition: string,
  sensors: string[],
  groups: string[]
) => void;

export type GetSessionDetailAction = {
  name: string;
};

//
// SENSORS
//
export interface UpdateSensorsMetaAction {
  sensor: string;
  key: string;
  value: any;
}

export type BuildSensorsFromMetaAction = SensorsMeta;

export interface InsertSensorsBulkDataAction {
  [sensor: string]: SensorData[];
}

//
// ALERT
//
export type ShowAlertAction = AlertState;
