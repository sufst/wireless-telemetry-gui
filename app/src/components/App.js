// Module Imports
import React, { Component } from 'react'
import { CSVLink } from 'react-csv'

// Config Imports 
import { PORT, HOST, ENDPOINTS } from '../config/config'
import { parseServerData, sendServerRequest } from '../config/server'

// Component Imports
import Header from './Header'

var exportCoreData = [];
var exportAeroData = [];

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
			console.log(`WebSocket Connected On ${HOST}:${PORT}`);
			
			this.setState({
				connection_status: 'CONNECTED'
			})

			const five_ago = Math.round(Date.now() / 1000) - 5; 
			socket.send(`GET /sensors?timesince=${five_ago}`)

			this.interval = setInterval(this.sendSocketDataRequest, 1000)
		}

		socket.onmessage = (message) => {
			const rpm = parseServerData(message)
			//console.log(rpm);
			this.setState({
				data: {
					core: {
						rpm: rpm
					}
				}
			})
		}

		socket.onclose = (event) => {
			console.log('WebSocket Disconnected: ', event);
			this.setState({
				connection_status: 'DISCONNECTED'
			})
		}

		socket.onerror = (error) => {
			console.error('WebSocket Error: ', error);
		}
	}

	sendSocketDataRequest = () => { 
		sendServerRequest(socket)
	}

	render() {
		const conStatus = this.state.connection_status;
		const core = this.state.data.core;

		let rpm = 'NO'
		if (!(core.rpm.last() == undefined)) {
			console.log(core.rpm.last());
			rpm = core.rpm.last().value
		}

		return (
			<div>
				<Header conStatus={conStatus}/> 
				<div className='container'>
					<p className='state'>{'RPM: ' + rpm}</p>
				</div>
			</div> 
		)
	}
}

export default App
