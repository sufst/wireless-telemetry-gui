import React from 'react'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function LineGraph( { data, animated, name } ) {
    const timeNow = Date().valueOf(Date.now()) / 100
    return (
        <LineChart
			width={500}
			height={300}
			data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" domain={[timeNow - 10, timeNow - 10]} />
            <YAxis  domain={[70, 110]} />
            <Tooltip />
            <Line name={name} isAnimationActive={animated} type="monotone" dataKey="value" stroke="#82ca9d" />
        </LineChart>
    )
}
