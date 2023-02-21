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
import { useStyles } from './styles';
import { Switch, FormControlLabel, Typography } from '@material-ui/core';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Label } from 'recharts';
import { GraphData } from 'types/models/ui-types';

export const SensorPaperHeaderHideButton: React.FC<{
	onChange: (event: any) => void;
	checked: boolean;
}> = ({ onChange, checked }) => {
	const classes = useStyles();

	return (
		<FormControlLabel
			control={
				<Switch checked={checked} onChange={onChange} color="primary" />
			}
			label="Show"
			className={classes.sensorPaperHeaderButton}
		/>
	);
};

export const SensorPaperHeaderTitle: React.FC<{ name: string }> = ({
	name
}) => {
	const classes = useStyles();

	return (
		<Typography variant="h6" className={classes.sensorPaperHeaderTitle}>
			{name}
		</Typography>
	);
};

export const SensorLiveValue: React.FC<{ value: number }> = ({ value }) => {
	const classes = useStyles();

	return (
		<Typography variant="h3" className={classes.sensorLiveValue}>
			{value}
		</Typography>
	);
};

export const SensorGraph: React.FC<{
	width: number;
	data: GraphData[];
	xAxisDomainMin: string;
	xAxisDomainMax: string;
	yAxisDomainMin: number;
	yAxisDomainMax: number;
	yAxisLabel: string;
}> = ({
	width,
	data,
	xAxisDomainMin,
	xAxisDomainMax,
	yAxisDomainMin,
	yAxisDomainMax,
	yAxisLabel
}) => {
	const classes = useStyles();

	return (
		<LineChart
			width={width}
			height={400}
			data={data}
			margin={{
				top: 5,
				right: 30,
				left: 20,
				bottom: 30
			}}
		>
			<CartesianGrid strokeDasharray="4 4 4 " />
			<XAxis
				dataKey="time"
				domain={[xAxisDomainMin, xAxisDomainMax]}
				stroke="#d0d0d0"
			>
				<Label
					value="Time (s)"
					offset={5}
					position="bottom"
					className={classes.sensorGraph}
				/>
			</XAxis>
			<YAxis domain={[yAxisDomainMin, yAxisDomainMax]} stroke="#d0d0d0">
				<Label
					value={yAxisLabel}
					offset={-10}
					position="insideLeft"
					angle={-90}
					className={classes.sensorGraph}
				/>
			</YAxis>
			<Line
				type="monotone"
				isAnimationActive={false}
				dataKey="value"
				stroke="#66b2ff"
				strokeWidth={3}
				dot={false}
			/>
		</LineChart>
	);
};
