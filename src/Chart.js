import "./App.css"
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default class Chart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            graphData: props.data,
        };
    }

    render() {
        return (
            <>
                <LineChart
                width={600}
                height={300}
                data={this.state.graphData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
                >
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="time" type="number" domain={[(new Date().valueOf() / 1000.0) - 10.0, new Date().valueOf() / 1000.0]} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    isAnimationActive={false}
                    dataKey="value"
                    stroke="#8884d8"
                    strokeWidth={2}
                />
                </LineChart>,
            </>
      );
    }
}