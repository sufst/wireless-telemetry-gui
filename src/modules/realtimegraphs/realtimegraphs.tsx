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

import React from 'react';
import { v4 } from 'uuid';
import { useStyles } from './styles';
import { Grid, Paper } from '@material-ui/core';
import { SensorPaperHeaderHideButton, SensorPaperHeaderTitle, SensorGraph, SensorLiveValue } from './components';
import { useSelector, useDispatch } from 'react-redux';
import { updateSensorsMeta } from 'redux/slices/sensors';
import type { RootState } from 'redux/store';
import { SensorData } from 'types/models/sensor';
import { GraphData } from 'types/models/ui-types';

interface props {
	name: string;
}

const SensorPaperHeaderContainer: React.FC<props> = ({ name }) => {
	const sensor = useSelector((state: RootState) => state.sensors.sensors[name].meta);

	const dispatch = useDispatch();

	const onChange = React.useCallback((event) => {
		event.preventDefault();
		dispatch(updateSensorsMeta({ sensor: name, key: 'isDisplay', value: !sensor.isDisplay }));
	}, [dispatch, name, sensor.isDisplay]);

	const HeaderTitle = React.memo(SensorPaperHeaderTitle);
	const HeaderButton = React.memo(SensorPaperHeaderHideButton);

	return (
		<Grid container alignItems="center" key={v4()} spacing={1}>
			<Grid item key={v4()} xs={6}>
				<HeaderTitle name={sensor.name} />
			</Grid>
			<Grid item key={v4()} xs={6}>
				<HeaderButton onChange={onChange} checked={sensor.isDisplay}/>
			</Grid>
		</Grid>
	);
};

const trimData: (data: SensorData[], expiredS: number) => SensorData[] = (data, expiredS) => {
	const epoch = data[data.length - 1].epoch;

	return data.filter(x => x.epoch > epoch + expiredS);
};

const convertDataToGraphData: (data: SensorData[]) => GraphData[] = (data) => {
	return data.map(x => {
		const date = (new Date(x.epoch * 1000));
		const time = date.toTimeString().split(' ')[0] + ':' + date.getMilliseconds();
		return { time, value: x.value };
	});
};

const SensorGraphContainer = (props: { name: string }) => {
	const selectSensorMeta = (state: RootState) => state.sensors.sensors[props.name].meta;
	const selectSensorData = (state: RootState) => state.sensors.sensors[props.name].data;

	const sensor = useSelector(selectSensorMeta);
	const inData = useSelector(selectSensorData);

	const graphData = convertDataToGraphData(trimData(inData, sensor.timeEndS));

	const LiveValue = React.memo(SensorLiveValue);
	const Graph = React.memo(SensorGraph);
	const date = new Date();
	const timeXStart = date.toTimeString().split(' ')[0] + ':' + date.getMilliseconds();
	const dateEnd = new Date((date.valueOf() / 1000) + sensor.timeEndS);
	const timeXEnd = dateEnd.toTimeString().split(' ')[0] + ':' + dateEnd.getMilliseconds();

	const classes = useStyles();

	return (
		<Grid container alignItems="center" key={v4()} spacing={1} className={classes.sensorGraphContainerRoot}>
			<Grid item key={v4()} xs={2}>
				{graphData.length > 0 ? <LiveValue key={v4()} value={Math.round(graphData[graphData.length - 1].value)}/> : <></>}
			</Grid>
			<Grid item key={v4()} xs={10}>
				<Graph
					data={graphData}
					width={700}
					xAxisDomainMin={timeXStart}
					xAxisDomainMax={timeXEnd}
					yAxisDomainMin={sensor.min}
					yAxisDomainMax={sensor.max}
					yAxisLabel={sensor.units}
				/>
			</Grid>
		</Grid>

	);
};

const SensorPaperContainer: React.FC = (props: { name: string }) => {
	const selectSensorMeta = (state: RootState) => state.sensors.sensors[props.name].meta;
	const sensor = useSelector(selectSensorMeta);

	const classes = useStyles();

	return (
		<Paper className={classes.sensorPaper}>
			<Grid container alignItems="center" key={v4()} spacing={1}>
				<Grid item key={v4()} xs={12}>
					<SensorPaperHeaderContainer key={v4()} name={props.name}/>
					{/* <Divider light /> */}
				</Grid>
				<Grid item key={v4()} xs={12}>
					{sensor.isDisplay ? <SensorGraphContainer key={v4()} name={props.name}/> : <></>}
				</Grid>
			</Grid>
		</Paper>
	);
};

const RealtimeSensorsGroupContainer: React.FC = (props: { name: string }) => {
	const selectSensors = (state: RootState) => state.sensors.groups[props.name];
	const sensors = useSelector(selectSensors);

	// See modules index.js for explaination of why useMemo is used.
	const sensorContainers = React.useMemo(() => {
		const containers = sensors.map((x: string) => {
			return (<Grid item key={v4()} xs={12}>
				<SensorPaperContainer key={v4()} name={x}/>
			</Grid>
			);
		});
		return containers;
	}, [sensors]);

	return (
		<Grid container alignItems="center" key={v4()}>
			{sensorContainers}
		</Grid>
	);
};

export default RealtimeSensorsGroupContainer;
