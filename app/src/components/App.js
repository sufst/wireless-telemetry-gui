import { Line } from '@reactchartjs/react-chart.js'

import React, { Component } from 'react'

// Config Imports 
import { AIPDU, PORT, HOST } from '../config/config'
import { parseData } from '../config/parser'

// Component Imports
import Header from './Header'

const net = require('net'); 

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

		this.state = {
			connection_status: 'DISCONNECTED',
			count: 0,
			data: {
				core: {
					speed: 0,
					rpm: 0,
					water_temp: 0,
					tps: 0,
					battery_mv: 0,
					external_5v_mv: 0,
					fuel_flow: 0,
					lambda: 0
				},
			},
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
				this.setState({ connection_status: 'CONNECTED'} )
			})
		})

		client.on('data',  (data) => {
			const parsedData = parseData(JSON.parse(data));

			switch (parsedData.type) {
				case 2:
					this.onReceivedCore(parsedData);
					break;
				default:
					break;
			}
		})

		client.on('error', (error) => {
			console.log('Error Connnecting to Server...');
		})

		client.on('end', () => {
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
							backgroundColor: 'rgb(255, 99, 132)',
							borderColor: 'rgba(255, 99, 132, 1)',
							data: [...this.state.graphs.rpmData.datasets[0].data, data.rpm] 
						}
					]
				}
			}
		})
	}

	render() {
		const conStatus = this.state.connection_status;
		return (
			<div>
				<Header conStatus={conStatus}/> 
				<Line className='chart' data={this.state.graphs.rpmData} options={options} />
				<div className='container'>
					<h1 className='state'>{'Core Data Received: ' + this.state.count}</h1>
					<h1 className='state'>{'RPM: ' + this.state.data.core.rpm}</h1>
					<h1 className='state'>{'Speed: ' + this.state.data.core.speed + ' KM/H'}</h1>
					<h1 className='state'>{'Water Temp: ' + this.state.data.core.water_temp + ' °C'}</h1>
					<h1 className='state'>{'Throttle Position: ' + this.state.data.core.tps + '%'}</h1>
					<h1 className='state'>{'Battery Voltage: ' + this.state.data.core.battery_mv + ' mV'}</h1>
					<h1 className='state'>{'External 5V: ' + this.state.data.core.external_5v_mv + ' mV'}</h1>
					<h1 className='state'>{'Fuel Flow: ' + this.state.data.core.fuel_flow}</h1>
					<h1 className='state'>{'Lambda: ' + this.state.data.core.lambda}</h1>
				</div>
			</div> 
		)
	}
}

export default App
