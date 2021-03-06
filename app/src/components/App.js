import { Line } from '@reactchartjs/react-chart.js'

import React, { Component } from 'react'

// Config Imports 
import { AIPDU, PORT, HOST } from '../config/config'
import { parseData } from '../config/parser'
import { CSVLink, CSVDownload } from "react-csv";

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

var exportCoreData = [];
var exportAeroData = [];

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
					this.onReceivedCore(parsedData);
					exportCoreData.push(newDataArray);
					break;
				case 3: 
					this.onReceivedAero(parsedData);
					exportAeroData.push(newDataArray);
					break;
				case 4: 
					this.onReceiveDiagnostics(parsedData); 
					break; 
				case 5: 
					this.onReceivePowertrain(parsedData); 
					break; 
				case 6: 
					this.onReceiveSuspension(parsedData); 
					break; 
				case 7: 
					this.onReceiveMisc(parsedData); 
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

	onReceiveMisc(data) {
		this.setState({
			data: {
				core: this.state.data.core,
				aero: this.state.data.aero, 
				diagn: this.state.data.diagn,
				power: this.state.data.power,
				susp: this.state.data.susp, 
				misc: data
			}
		})
	}

	onReceiveSuspension(data) {
		this.setState({
			data: {
				core: this.state.data.core,
				aero: this.state.data.aero, 
				diagn: this.state.data.diagn,
				power: this.state.data.power,
				susp: data,
				misc: this.state.data.misc,
			}
		})
	}

	onReceivePowertrain(data) {
		this.setState({
			data: {
				core: this.state.data.core,
				aero: this.state.data.aero, 
				diagn: this.state.data.diagn,
				power: data,
				susp: this.state.data.susp,
				misc: this.state.data.misc,
			}
		})
	}

	onReceiveDiagnostics(data) {
		this.setState({
			data: {
				core: this.state.data.core,
				aero: this.state.data.aero, 
				diagn: data,
				power: this.state.data.power,
				susp: this.state.data.susp,
				misc: this.state.data.misc,
			}
		})
	}

	onReceivedAero(data) {
		this.setState({
			data: {
				core: this.state.data.core,
				aero: data, 
				diagn: this.state.data.diagn, 
				power: this.state.data.power, 
				susp: this.state.data.susp,
				misc: this.state.data.misc,
			}
		})
	}

	onReceivedCore(data) {
		if (this.state.count > 20) {
			this.state.graphs.rpmData.labels.shift();
		}
		this.setState({
			count: this.state.count + 1, 
			data: {
				core: data,
				aero: this.state.data.aero,
				diagn: this.state.data.diagn,
				power: this.state.data.power,
				susp: this.state.data.susp,
				misc: this.state.data.misc,
			}, 
			graphs: {
				rpmData: {
					labels: [...this.state.graphs.rpmData.labels, this.state.count],
					datasets: [
						{ 
							label: 'RPM',
							fill: false,
							backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
		const diagn = this.state.data.diagn; 
		const power = this.state.data.power;
		const susp = this.state.data.susp; 
		const misc = this.state.data.misc;

		const aeroKeys = Object.keys(aero);
		const coreKeys = Object.keys(core);
		aeroKeys.splice(0,1);
		coreKeys.splice(0,1);

		return (
			<div>
				<Header conStatus={conStatus}/> 
				<div className='container'>
					{/* <AppBar position="static">
						<Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
						<Tab label="Core" {...a11yProps(0)} />
						<Tab label="Aero" {...a11yProps(1)} />
						</Tabs>
					</AppBar> */}
					<div label="Core"> 
							<h2>Core</h2>
							<CSVLink data={exportCoreData} headers={coreKeys}>Export to CSV</CSVLink>
							<p className='state'>{'Core Data Received: ' + this.state.count}</p>
							<p className='state'>{'RPM: ' + core.rpm.last()}</p>
							<p className='state'>{'Speed: ' + core.speed.last() + ' KM/H'}</p>
							<p className='state'>{'Water Temp: ' + core.water_temp.last() + ' °C'}</p>
							<p className='state'>{'Throttle Position: ' + core.tps.last() + '%'}</p>
							<p className='state'>{'Battery Voltage: ' + core.battery_mv.last() + ' mV'}</p>
							<p className='state'>{'External 5V: ' + core.external_5v_mv.last() + ' mV'}</p>
							<p className='state'>{'Fuel Flow: ' + core.fuel_flow.last() }</p>
							<p className='state'>{'Lambda: ' + core.lambda.last() }</p> 
					</div>
					<hr></hr>
					<div label="Aero"> 
						<h2>Aero</h2>
						<CSVLink data={exportAeroData} headers={aeroKeys}>Export to CSV</CSVLink>
						<p className='state'>{'EVO 1: ' + aero.evo_1.last() }</p>
						<p className='state'>{'EVO 2: ' + aero.evo_2.last() }</p>
						<p className='state'>{'EVO 3: ' + aero.evo_3.last() }</p>
						<p className='state'>{'EVO 4: ' + aero.evo_4.last() }</p>
						<p className='state'>{'EVO 5: ' + aero.evo_5.last() }</p>
						<p className='state'>{'EVO 6: ' + aero.evo_6.last() }</p>
						<p className='state'>{'EVO 7: ' + aero.evo_7.last() }</p>
					</div>
					<hr></hr>
					<h2>Diagnostics</h2> 
					<p className='state'>{'ECU Status: ' + diagn.ecu_status.last() }</p>
					<p className='state'>{'Engine Status: ' + diagn.engine_status.last() }</p>
					<p className='state'>{'Battery Status: ' + diagn.battery_status.last() }</p>
					<p className='state'>{'Logging Status: ' + diagn.logging_status.last() }</p>
					<hr></hr>
					<h2>Power-Train</h2> 
					<p className='state'>{'Injection Cycle: ' + power.injection_cycle.last() }</p>
					<p className='state'>{'Lambda Adjust: ' + power.lambda_adjust.last() }</p>
					<p className='state'>{'Lambda Target: ' + power.lambda_target.last() }</p>
					<p className='state'>{'Advance: ' + power.advance.last() }</p>
					<hr></hr>
					<h2>Suspension</h2> 
					<p className='state'>{'Height Front Left: ' + susp.height_fl.last() }</p>
					<p className='state'>{'Height Front Right: ' + susp.height_fr.last() }</p>
					<p className='state'>{'Height Front Left Wheel: ' + susp.height_flw.last() }</p>
					<p className='state'>{'Height Rear: ' + susp.height_rear.last() }</p>
					<hr></hr>
					<h2>Miscellaneous</h2> 
					<p className='state'>{'Lap Timer: ' + misc.lap_timer.last() }</p>
					<p className='state'>{'Accel X-Axis: ' + misc.accel_fl_x.last() }</p>
					<p className='state'>{'Accel Y-Axis: ' + misc.accel_fl_y.last() }</p>
					<p className='state'>{'Accel Z-Axis: ' + misc.accel_fl_z.last() }</p>
				</div>
			</div> 
		)
	}
}

export default App
