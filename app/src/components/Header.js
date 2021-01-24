import React from 'react'

import logo from '../../assets/app-logo.png'

export default function Header( {conStatus} ) {
    
    const isConnected = conStatus === 'CONNECTED' ? true : false 
	const statusStyle = isConnected == true ? 'status-connected' : 'status-dis'
    
    return (
        <header>
			<div className='container'>
				<div className='nav-logo'>
					<img src={logo} width='50px' height='50px'/>
					<h1 className='header-title'>STAG Telemetry</h1>
				</div> 
				<h1 className={statusStyle}>{conStatus}</h1>
			</div>
		</header>
    )

}
