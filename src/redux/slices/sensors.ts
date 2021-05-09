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
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SensorData = {
    epoch: number,
    value: number
};

type SensorMeta = { 
    [entry: string ]: any 
};

type Sensor = {
    meta: SensorMeta,
    data: Array<SensorData>,
    isDisplay: boolean
};

type SensorsState = {
    sensors: {
        [sensor: string]: Sensor
    },
    groups: {
        [sensor: string]: Array<string>
    }
};

type Meta = {
    [sensor: string]: SensorMeta
};

type BuildSensorsFromMetaAction = {
    payload: Meta
};

type InsertSensorsBulkDataAction = {
    [sensor: string]: Array<SensorData>
};

type UpdateSensorsMetaAction = {
    sensor: string,
    key: string,
    value: any
};

const initialState: SensorsState = {
    sensors: {},
    groups: {}
};


export const sensorsSlice = createSlice({
   name: 'sensors',
   initialState,
   reducers: {
    buildSensorsFromMeta: (state: SensorsState, action: PayloadAction<BuildSensorsFromMetaAction>) => {
            const meta: Meta = action.payload;
            for (const sensor in meta) {
                // Set a default graph cut off of 2 seconds
                state.sensors[sensor] = {
                    data: [], 
                    meta: {...meta[sensor], timeEndS: -2.0}, 
                    isDisplay: false
                };
                const group = state.sensors[sensor].meta.group;
                if (state.groups[group] === undefined) {
                    state.groups[group] = [];
                } 
                state.groups[group].push(sensor);
            }
      }, 
      insertSensorsBulkData: (state: SensorsState, action: PayloadAction<InsertSensorsBulkDataAction>) => {
        const data = action.payload;

        // Stale data cut off time
        const staleEpoch = (new Date().valueOf() / 1000) - 20;

        for (const sensor in data) {
            // Only keep the last 20 seconds worth of data (to prevent a memory leak) 
            state.sensors[sensor].data = [...state.sensors[sensor].data.filter(x => x.epoch > staleEpoch), ...data[sensor]];
        }
      },
      updateSensorsMeta: (state: SensorsState, action: PayloadAction<UpdateSensorsMetaAction>) => {
          const sensor = action.payload.sensor;
          const key = action.payload.key;
          const value = action.payload.value;
          state.sensors[sensor].meta[key] = value;
      }
   }
})

export const { buildSensorsFromMeta, insertSensorsBulkData, updateSensorsMeta } = sensorsSlice.actions; 

export default sensorsSlice.reducer;