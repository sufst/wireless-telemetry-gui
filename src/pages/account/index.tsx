// Module Imports
import React, { useCallback } from 'react'

// Container
import AccountContainer from './container'

// Context
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from "redux/store";

import { logoutUser } from 'redux/slices/user';

const Account = () => {
   const dispatch = useDispatch(); 

   const selectUser = (state: RootState) => state.user;
   const user = useSelector(selectUser);

   console.log("USER: ", user);
   
  
   const onLogoutClick = useCallback(() => {
      dispatch(logoutUser()); 
   }, [dispatch]); 

   return (
      <AccountContainer user={user} onLogoutClick={onLogoutClick}/>
   )
}

export default Account
