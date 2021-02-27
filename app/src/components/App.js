import { Line } from '@reactchartjs/react-chart.js'

import React, { Component } from 'react'

// Config Imports 
import { AIPDU, PORT, HOST } from '../config/config'
import { parseData } from '../config/parser'

// Component Imports
import Header from './Header'

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
			const parsedData = parseData(oldData, newData);

			switch (parsedData.type) {
				case 2:
					this.onReceivedCore(parsedData);
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

	onReceivedCore(data) {
		this.setState({
			count: this.state.count + 1, 
			data: {
				core: data
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
		const core = this.state.data.core
		return (
			<div>
				<Header conStatus={conStatus}/> 
				<Line className='chart' data={this.state.graphs.rpmData} options={options} />
				<div className='container'>
					<h1 className='state'>{'Core Data Received: ' + this.state.count}</h1>
					<h1 className='state'>{'RPM: ' + core.rpm.last()}</h1>
					<h1 className='state'>{'Speed: ' + core.speed.last() + ' KM/H'}</h1>
					<h1 className='state'>{'Water Temp: ' + core.water_temp.last() + ' °C'}</h1>
					<h1 className='state'>{'Throttle Position: ' + core.tps.last() + '%'}</h1>
					<h1 className='state'>{'Battery Voltage: ' + core.battery_mv.last() + ' mV'}</h1>
					<h1 className='state'>{'External 5V: ' + core.external_5v_mv.last() + ' mV'}</h1>
					<h1 className='state'>{'Fuel Flow: ' + core.fuel_flow.last() }</h1>
					<h1 className='state'>{'Lambda: ' + core.lambda.last() }</h1>
				</div>
			</div> 
		)
	}
}

export default App
