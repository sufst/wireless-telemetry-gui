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
import React from 'react';
import {
    useUserStoreReducer,
    UserStore,
} from "../store/user";
import {
    AppContainer
} from "./containers";
import {
    useSensorsConfigStoreReducer,
    useSensorsDataStoreReducer,
    SensorsConfigStore,
    SensorsDataStore
} from "../store/sensors";

export function App(props) {
    const [userStore, userStoreDispatch] = useUserStoreReducer();
    const [sensorsData, sensorsDataDispatch] = useSensorsDataStoreReducer();
    const [sensorsConfig, sensorsConfigDispatch] = useSensorsConfigStoreReducer();
    
    return (
        <UserStore.Provider value={{state: userStore, dispatch: userStoreDispatch}} >
            <SensorsDataStore.Provider value={{state: sensorsData, dispatch: sensorsDataDispatch}} >
                <SensorsConfigStore.Provider value={{state: sensorsConfig, dispatch: sensorsConfigDispatch}} >
                    <AppContainer />
                </SensorsConfigStore.Provider>
            </SensorsDataStore.Provider>
        </UserStore.Provider>
    );
} 

