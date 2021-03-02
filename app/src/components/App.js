import { Line } from '@reactchartjs/react-chart.js'

import React, { Component } from 'react'

// Config Imports 
import { AIPDU, PORT, HOST } from '../config/config'
import { parseData } from '../config/parser'
import { CSVLink, CSVDownload } from "react-csv";

// Component Imports
import Header from './Header'
import { count } from 'console';

const net = require('net'); 

// For graph testing purposes. Ignore for now..
const options = {
	// scales: {
	//   yAxes: [
	// 	{
	// 	  ticks: {
	// 		beginAtZero: true,
	// 	  },
	// 	},
	//   ],
	// },
  }

var exportCoreData = [];

class App extends Component {

	constructor(props) {
		super(props); 

		// Helper function to get last element of array...
		if (!Array.prototype.last){
			Array.prototype.last = function(){
				return this[this.length - 1];
			};
		};

		this.state = {
			connection_status: 'DISCONNECTED',
			count: 0,
			data: {
				core: {
					speed: [],
					rpm: [],
					water_temp: [],
					tps: [],
					battery_mv: [],
					external_5v_mv: [],
					fuel_flow: [],
					lambda: [],
				},
				aero: {
					evo_1: [],
					evo_2: [],
					evo_3: [],
					evo_4: [],
					evo_5: [],
					evo_6: [],
					evo_7: [],
				}
			},
			// State from here and downwards is only used for the dummy graph. Will be changed for final version...
			graphs: {
				rpmData: {
					labels: [0],
					datasets: [
					  {
						label: 'RPM',
						data: [],
						fill: false,
						backgroundColor: 'rgb(255, 99, 132)',
						borderColor: 'rgba(255, 99, 132, 1)',
					  },
					],
				 }
			}
		}
	}

	componentDidMount() {
		this.connectToServer(); 
	}

	connectToServer() {
		const client = new net.Socket();
	
		client.connect({ port: PORT, host: HOST }, () => {
			client.write(AIPDU, ()  => {
				// Successfully Connected to Back-End Server
				this.setState({ connection_status: 'CONNECTED'} )
			})
		})

		client.on('data',  (data) => {
			// Called everytime data has been received by the back-end
			const oldData = this.state.data
			const newData = JSON.parse(data);
			var newDataArray = Object.values(newData);
			newDataArray.splice(0,3);
			const parsedData = parseData(oldData, newData);
			switch (parsedData.type) {
				case 2:
					//console.log("Received parsed Core");
					this.onReceivedCore(parsedData);
					console.log(newDataArray);	
					exportCoreData.push(newDataArray);
					break;
				case 3: 
					this.onReceivedAero(parsedData); 
					break;
				default:
					break;
			}
		})

		client.on('error', (error) => {
			// An unhandled error has occured in the socket connection to the back-end
			console.log('Error Connnecting to Server: ', error);
		})

		client.on('end', () => {
			// The socket connection to the back-end has been terminated.
			console.log('Server connection ended...');
			this.setState( {connection_status: 'DISCONNECTED'} )
		})
	}

	onReceivedAero(data) {
		this.setState({
			data: {
				core: this.state.data.core,
				aero: data
			}
		})
	}

	onReceivedCore(data) {
		this.setState({
			count: this.state.count + 1, 
			data: {
				core: data,
				aero: this.state.data.aero
			}, 
			graphs: {
				rpmData: {
					labels: [...this.state.graphs.rpmData.labels, this.state.count],
					datasets: [
						{ 
							label: 'RPM',
							fill: false,
							backgroundColor: 'rgba(0, 0, 0, 0.5)',
							borderColor: 'rgba(255, 99, 132, 1)',
							data: data.rpm
						}
					]
				}
			}
		})
	}

	render() {
		const conStatus = this.state.connection_status;
		const core = this.state.data.core;
		const aero = this.state.data.aero;
		var keys = Object.keys(core);
		keys.splice(0,1);

		return (
			<div>
				<Header conStatus={conStatus}/> 
				{/* <Line className='chart' data={this.state.graphs.rpmData} options={options} /> */}
				<div className='container'>
				<CSVLink data={exportCoreData} headers={keys}>Export to CSV</CSVLink>
					<p className='state'>{'Core Data Received: ' + this.state.count}</p>
					<p className='state'>{'RPM: ' + core.rpm.last()}</p>
					<p className='state'>{'Speed: ' + core.speed.last() + ' KM/H'}</p>
					<p className='state'>{'Water Temp: ' + core.water_temp.last() + ' °C'}</p>
					<p className='state'>{'Throttle Position: ' + core.tps.last() + '%'}</p>
					<p className='state'>{'Battery Voltage: ' + core.battery_mv.last() + ' mV'}</p>
					<p className='state'>{'External 5V: ' + core.external_5v_mv.last() + ' mV'}</p>
					<p className='state'>{'Fuel Flow: ' + core.fuel_flow.last() }</p>
					<p className='state'>{'Lambda: ' + core.lambda.last() }</p>
					<hr></hr>
					<p className='state'>{'EVO 1: ' + aero.evo_1.last() }</p>
					<p className='state'>{'EVO 2: ' + aero.evo_2.last() }</p>
					<p className='state'>{'EVO 3: ' + aero.evo_3.last() }</p>
					<p className='state'>{'EVO 4: ' + aero.evo_4.last() }</p>
					<p className='state'>{'EVO 5: ' + aero.evo_5.last() }</p>
					<p className='state'>{'EVO 6: ' + aero.evo_6.last() }</p>
					<p className='state'>{'EVO 7: ' + aero.evo_7.last() }</p>
				</div>
			</div> 
		)
	}
}

export default App
