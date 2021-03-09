// Module Imports
import React, { Component } from 'react'
import { CSVLink } from 'react-csv'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Config Imports 
import { PORT, HOST } from '../config/config'
import { parseServerData } from '../config/server'

// Component Imports
import Header from './Header'
import LineGraph from './LineGraph'

const socket = new WebSocket(`ws://${HOST}:${PORT}/`)

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
			data: {
				core: {
					speed_kph: [],
					rpm: [],
					water_temp_c: [],
					tps_perc: [],
					battery_mv: [],
					external_5v_mv: [],
					fuel_flow: [],
					lambda: [],
				},
				aero: {
					evo_scan_1: [],
					evo_scan_2: [],
					evo_scan_3: [],
					evo_scan_4: [],
					evo_scan_5: [],
					evo_scan_6: [],
					evo_scan_7: [],
				},
				diagnostic: {
					status_ecu_connected: [],
					status_engine: [],
					status_loggin: [],
					inj_time: [],
				},
				power: {
					inj_duty_cycle: [],
					lambda_adjust: [],
					lambda_target: [],
					advance: [],
				}, 
				suspension: {
					ride_height_fl_cm: [],
					ride_height_fr_cm: [],
					ride_height_flw_cm: [],
					ride_height_rear_cm: [],
				},
				misc: {
					lap_time_s: [],
					accel_fl_x_mg: [],
					accel_fl_y_mg: [],
					accel_fl_z_mg: [],
				}
			},
		}
	}

	componentDidMount() {
		this.connectToServer(); 
	}

	connectToServer() {
		socket.onopen = () => {
			console.log(`WebSocket connected on ${HOST}:${PORT}`);
			
			this.setState({ connection_status: 'CONNECTED' })

			this.interval = setInterval(this.fetchSensorData, 1000)
		}

		socket.onmessage = (message) => {
			const values = parseServerData(message)
			this.setState({ data: values })
		}

		socket.onclose = (event) => {
			console.log('WebSocket Disconnected: ', event);
			this.setState({ connection_status: 'DISCONNECTED' })
		}

		socket.onerror = (error) => {
			console.error('WebSocket Error: ', error);
		}
	}

	fetchSensorData = () => { 
		const epoch = Math.round(Date.now() / 1000) - 120; 
		socket.send(`GET /sensors?amount=20&timesince=${epoch}`)
	}

	render() {
		const conStatus = this.state.connection_status;
		const core = this.state.data.core
		return (
			<div>
				<Header conStatus={conStatus}/> 
				<LineGraph data={core.rpm} animated={false} />
				<LineGraph data={core.water_temp_c} animated={false} />
				<div className='container'>
					<h2>Core</h2>
					<p className='state'>{'Speed: ' + core.speed_kph[0]?.value}</p>
					<p className='state'>{'RPM: ' + core.rpm[0]?.value}</p>
					<p className='state'>{'Lambda: ' + core.lambda[0]?.value}</p>
					<p className='state'>{'Water Temp: ' + core.water_temp_c[0]?.value}</p>
				</div>
			</div> 
		)
	}
}

export default App
