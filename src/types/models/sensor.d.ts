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

export interface SensorData {
	epoch: number;
	value: number
}

export interface SensorMeta {
	[entry: string ]: any
}

export interface Sensor {
	meta: SensorMeta;
	data: SensorData[];
	isDisplay: boolean
}

export interface SensorsState {
	sensors: {
		[sensor: string]: Sensor
	};
	groups: {
		[sensor: string]: string[]
	};
	sensorMetadata: SensorMeta
}

export interface SensorsMeta {
	[sensor: string]: SensorMeta
}
