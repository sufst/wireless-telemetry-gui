// Module Imports
import React from 'react'

// Container
import AccountContainer from './container'

// Context
import { useUser } from '../store/user';

const Account = () => {
   const user = useUser(); 

   const onLogoutClick = () => {
      console.log('Logging out');
   }

   return (
      <AccountContainer user={user} onLogoutClick={onLogoutClick}/>
   )
}

export default Account
