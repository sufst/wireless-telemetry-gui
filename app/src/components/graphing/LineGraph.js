import React from 'react'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function LineGraph( { data, animated } ) {
    return (
        <LineChart
			width={500}
			height={300}
			data={data.reverse()}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis  domain={[50, 150]} />
            <Tooltip />
            <Line isAnimationActive={animated} type="monotone" dataKey="value" stroke="#82ca9d" />
        </LineChart>
    )
}
