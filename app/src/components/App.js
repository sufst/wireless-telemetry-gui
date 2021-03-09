// Module Imports
import React, { Component } from 'react'
import { CSVLink } from 'react-csv'

// Config Imports 
import { PORT, HOST } from '../config/config'
import { parseServerData, sendServerRequest } from '../config/server'

// Component Imports
import Header from './Header'

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
				},
				diagn: {
					ecu_status: [],
					engine_status: [],
					battery_status: [],
					logging_status: [],
				},
				power: {
					injection_cycle: [],
					lambda_adjust: [],
					lambda_target: [],
					advance: [],
				}, 
				susp: {
					height_fl: [],
					height_fr: [],
					height_flw: [],
					height_rear: [],
				},
				misc: {
					lap_timer: [],
					accel_fl_x: [],
					accel_fl_y: [],
					accel_fl_z: [],
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
			const rpm = parseServerData(message)
			this.setState({ 
				data: {
					core: {
						rpm: rpm.reverse()
					}
				}
			})
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
		const epoch = Math.round(Date.now() / 1000) - 10; 
		socket.send(`GET /sensors?amount=20&timesince=${epoch}`)
	}

	render() {
		const conStatus = this.state.connection_status;
		const rpm = this.state.data.core.rpm

		return (
			<div>
				<Header conStatus={conStatus}/> 
				<div className='container'>
					<p className='state'>{'RPM: ' + rpm.last()?.value}</p>
				</div>
			</div> 
		)
	}
}

export default App
