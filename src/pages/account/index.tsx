// Module Imports
import React from 'react'

// Container
import AccountContainer from './container'

// Context
import { useSelector } from 'react-redux';
import type { RootState } from "redux/store";

const Account = () => {
    const selectUser = (state: RootState) => state.user;
    const user = useSelector(selectUser);

   const onLogoutClick = () => {
      console.log('Logging out');
   }

   return (
      <AccountContainer user={user} onLogoutClick={onLogoutClick}/>
   )
}

export default Account
