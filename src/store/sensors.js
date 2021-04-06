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
import { 
    createContext, 
    useReducer, 
    useContext 
} from 'react';

export const SensorsDataStore = createContext();
export const SensorsConfigStore = createContext();

function sensorsDataStoreReducer(state, action) {
    const temp = {...state};
    
    // Stale data cut off time
    const staleEpoch = (new Date().valueOf() / 1000) - 20;

    switch(action.type) {
        case "update":
            // Only keep the last 20 seconds worth of data (to prevent a memory leak) 
            temp[action.sensor] = [...temp[action.sensor].filter(x => x.epoch > staleEpoch), ...action.data];
            return temp;
        case "bulk_update":
                for (const sensor in action.updates) {
                    // Only keep the last 20 seconds worth of data (to prevent a memory leak) 
                    temp[sensor] = [...temp[sensor].filter(x => x.epoch > staleEpoch), ...action.updates[sensor]];
                }

                return temp;
        case "build":
            return action.build;
        default:
            throw new Error();
    }
}

function sensorsConfigStoreReducer(state, action) {
    const temp = {...state};

    switch(action.type) {
        case "update_sensor":
            temp[action.group].sensors[action.sensor][action.key] = action.value;
            return temp;
        case "update_group":
                temp[action.group][action.key] = action.value;
                return temp;
        case "build":
                return action.build;
        default:
            throw new Error();
    }
}

export function useSensorsConfigStoreReducer() {
    return useReducer(sensorsConfigStoreReducer, {});
}

export function useSensorsDataStoreReducer() {
    return useReducer(sensorsDataStoreReducer, {});
}

export function useGroups() {
    return useContext(SensorsConfigStore).state
}

export function useGroup(name) {
    return useGroups()[name];
}

export function useGroupSensors(name) {
    return useGroup(name).sensors;
}

export function useSensorDataDispatch() {
    return useContext(SensorsDataStore).dispatch;
}

export function useSensorConfigDispatch() {
    return useContext(SensorsConfigStore).dispatch;
}

export function useSensor(group, name) {
    return useGroup(group).sensors[name];
}

export function useSensorData(name) {
    return useContext(SensorsDataStore).state[name];
}

export function useSensorsData() {
    return useContext(SensorsDataStore).state;
}

export function buildConfigStoreFromSensorConfig(config) {
    const configStore = {};

    for (const sensor in config) {
        const group = config[sensor].group;
        if (configStore[group] === undefined) {
            configStore[group] = {isDisplay: false, sensors: {}};
        }
        // Set a default graph cut off of 2 seconds
        configStore[group].sensors[sensor] = {timeEndS: -2.0};
        for (const entry in config[sensor]) {
            configStore[group].sensors[sensor][entry] = config[sensor][entry];
        }
    }

    return configStore;
}

export function buildDataStoreFromSensorConfig(config) {
    const dataStore = {};

    for (const sensor in config) {
        dataStore[sensor] = [];
    }

    return dataStore;
}