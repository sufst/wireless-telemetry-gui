// Module Imports
import React from 'react'

// Container
import AccountContainer from './container'

// Context
import { useSelector } from 'react-redux';

const Account = () => {
   const user = useSelector(state => state.user)

   const onLogoutClick = () => {
      console.log('Logging out');
   }

//    return (
//       <AccountContainer user={user} onLogoutClick={onLogoutClick}/>
//    )
}

export default Account
