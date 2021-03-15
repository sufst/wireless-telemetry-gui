import "./app.css"
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

export default class AppRealTimeGraphs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //TODO: enable buttons for each graph type.
            graphData: props.graphData,
            numberGraphsPerRow: 2
        };
        
        this.graphEndS = -2.0;
        this.graphStartS = -0.0;
    }

    render() {
         // Check if the graph data is empty (before socket request of sensor data occurs)
         if (Object.keys(this.state.graphData).length === 0)
         {
             return (
                 <div className="AppRealTimeGraphs">
                     <h2>No Graphs Yet :(</h2>
                 </div>
             );
         } else {
             return (
                 <div className="AppRealTimeGraphs">
                    <h2>GRAPHS!!! :D</h2>
                    <form>
                        <p>Enter number of graphs per row:</p>
                        <input type="number" onChange={(event) => this.setState({numberGraphsPerRow: event.target.value})}/>
                    </form>
                    {this.getGraphTable()}
                 </div>
             );
         }
    }

    getGraphTable() {
         let tableRowsMapping = [];
        let rows = []

        let rowBuffer = []
        // Build the mapping of graph to rows
        for (let entry in this.state.graphData) {

            rowBuffer.push(entry);

            if (rowBuffer.length >= this.state.numberGraphsPerRow) {
                tableRowsMapping.push(rowBuffer);
                rowBuffer = [];
            }
        }

        tableRowsMapping.forEach((row_map, index) => 
            rows.push(this.getGraphTableRowEntry(row_map, index))
            );

        return (
            <table>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }

    getGraphTableRowEntry(row_map, index) {
        let row = [];
        
        row_map.forEach((entry, number) => {
            const graph = this.state.graphData[entry];

            row.push(
                <td key={"td_" + number}>
                    <this.Graph title={entry} timeEndS={this.graphEndS} timeStartS={this.graphStartS} min={graph.min} max={graph.max} graphData={graph.data}/>
                </td>);
        });

        return (
            <tr key={"tr_" + index}>
                {row}
            </tr>
        );
    }

    Graph(props) {
        return (
            <>
                <h2>{props.title}</h2>
                <LineChart
                    width={800}
                    height={400}
                    data={props.graphData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" type="number" domain={[props.timeEndS, props.timeStartS]} />
                    <YAxis domain={[props.min, props.max]}/>
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        isAnimationActive={false}
                        dataKey="value"
                        stroke="#8884d8"
                        strokeWidth={2}
                    />
                </LineChart>
            </>
        );
    }
}