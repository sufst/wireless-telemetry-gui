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

import type { Color } from "@material-ui/lab/Alert"
import { AlertState } from "redux/typing";

export type AlertTimeout = number;
export type AlertLevel = Color;
export type AlertType = "snack" | "alert";
export type AlertText = string;


export type Alert = {
   timeout: AlertTimeout,
    level: AlertLevel,
    type: AlertType,
    text: AlertText
}

export type CreateAlert = (timeout: AlertTimeout, level: AlertLevel, type: AlertType, text: AlertText) => Alert;