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
			speed: 0
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

			const speed = parseData(JSON.parse(data));

			if (speed == undefined) {
				console.log('NO SPEED');
				return
			}

			this.setState({ speed: speed })
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
					<h1>fff</h1>
					<h1 className='state'>{'Speed: ' + this.state.speed + ' km/h'}</h1>
				</div>
			</div> 
		)
	}
}

export default App
