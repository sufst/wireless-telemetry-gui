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

export type UserPrivilege = "Anon" | "Basic" | "Admin" | "Developer";

export type UserDepartment =
  | "Electronics"
  | "Operations"
  | "Power-train"
  | "Vehicle Performance"
  | "Race Engineering"
  | "Aerodynamics"
  | "Tier 1"
  | "NON SPECIFIED";

export interface UserMeta {
  dept?: string;
  lastLogin?: string;
  createdAt?: string;
}

export interface UserState {
  username?: string;
  accessToken?: string;
  privilege?: UserPrivilege;
  creation?: number;
  department: UserDepartment;
  meta: UserMeta;
}
