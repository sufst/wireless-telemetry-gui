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
import React, {
    useEffect
} from "react";
import {
    RealTimeGraphs
} from "../realtimegraphs/index";
import {
    sio
} from "../backend/backend";
import {
    buildConfigStoreFromSensorConfig,
    buildDataStoreFromSensorConfig,
    useSensorConfigDispatch,
    useSensorDataDispatch,
    useSensorsData
} from "../store/sensors";

export function DashContainer(props) {
    const dataDispatch = useSensorDataDispatch();

    const sensors = useSensorsData();

    useEffect(() => {
        sio.once("data", message => {
            const data = JSON.parse(message);
    
            console.log(data);
    
            dataDispatch({type: "bulk_update", updates: data});
        });
    }, [dataDispatch, sensors]);
    
    return (
        <RealTimeGraphs />
    );
}

export function DashLoaderContainer(props) {
    const configDispatch = useSensorConfigDispatch();
    const dataDispatch = useSensorDataDispatch();

    useEffect(() => {
        sio.once("meta", message => {
            const meta = JSON.parse(message);
            console.log(meta);
            const configBuild = buildConfigStoreFromSensorConfig(meta);
            const dataBuild = buildDataStoreFromSensorConfig(meta);
            configDispatch({type: "build", build: configBuild});
            dataDispatch({type: "build", build: dataBuild});

            props.finishedCallback(undefined);
        });
    }, [configDispatch, dataDispatch, props]);

    return (
        <h1>Loading...</h1>
    );
}