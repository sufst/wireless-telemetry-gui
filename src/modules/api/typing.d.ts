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
import type {
    SensorsMeta,
    SensorData,
    UserMeta,
    UserPrivilege
} from "redux/typing";

export type LoginUser = (username: string, password: string) => Promise;

export type SioConnect = (accessToken: string, onMeta: SioOnMetaHander, onData: SioOnDataHandler) => void;
export type SioOnMetaHander = (meta: SensorsMeta) => void;
export type SioOnDataHandler = (data: { [sensor: string]: Array<SensorData> }) => void;

export type UsersCreate = (username: string, password: string, meta: object) => Promise;

export type UserGet = (accessToken: string) => Promise;
export type UserGetResponse = {
    username: string,
    creation: number,
    privilege: UserPrivilege,
    meta: string
};
