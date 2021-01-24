import React, { Component } from 'react'

// Config Imports 
import { AIPDU, PORT, HOST } from '../config/config'
import { parseData } from '../config/parser'

// Component Imports
import Header from './Header'

const net = require('net'); 

class App extends Component {

	constructor(props) {
		super(props); 

		this.state = {
			connection_status: 'DISCONNECTED',
			count: 0,
			data: {
				speed: 0,
				rpm: 0,
				water_temp: 0,
				tps: 0,
				battery_mv: 0,
				external_5v_mv: 0,
				fuel_flow: 0,
				lambda: 0
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
			this.setState({ count: this.state.count + 1})

			const parsedData = parseData(JSON.parse(data));

			// Defaulting to the previous value if the current PDU doesn't have that field. Example, if we got sent Aero PDU which doesn't have a speed field, we will default to the previous speed value. 
			this.setState({
				data: {
					speed: parsedData?.speed ?? this.state.data.speed,
					rpm: parsedData?.rpm ?? this.state.data.rpm,
					water_temp: parsedData?.water_temp ?? this.state.data.water_temp,
					tps: parsedData?.tps ?? this.state.data.tps,
					battery_mv: parsedData?.battery_mv ?? this.state.data.battery_mv,
					external_5v_mv: parsedData?.external_5v_mv ?? this.state.data.external_5v_mv,
					fuel_flow: parsedData?.fuel_flow ?? this.state.data.fuel_flow,
					lambda: parsedData?.lambda ?? this.state.data.lambda
				}
			})
		})

		client.on('error', (error) => {
			console.log('Error Connnecting to Server...');
		})

		client.on('end', () => {
			console.log('Server connection ended...');
			this.setState( {connection_status: 'DISCONNECTED'} )
		})
	}

	render() {
		const conStatus = this.state.connection_status;
		return (
			<div>
				<Header conStatus={conStatus}/> 
				<div className='container'>
					<h1 className='state'>{'Data Received: ' + this.state.count}</h1>
					<h1 className='state'>{'RPM: ' + this.state.data.rpm}</h1>
					<h1 className='state'>{'Speed: ' + this.state.data.speed + ' KM/H'}</h1>
					<h1 className='state'>{'Water Temp: ' + this.state.data.water_temp + ' °C'}</h1>
					<h1 className='state'>{'Throttle Position: ' + this.state.data.tps + '%'}</h1>
					<h1 className='state'>{'Battery Voltage: ' + this.state.data.battery_mv + ' mV'}</h1>
					<h1 className='state'>{'External 5V: ' + this.state.data.external_5v_mv + ' mV'}</h1>
					<h1 className='state'>{'Fuel Flow: ' + this.state.data.fuel_flow}</h1>
					<h1 className='state'>{'Lambda: ' + this.state.data.lambda}</h1>
				</div>
			</div> 
		)
	}
}

export default App
