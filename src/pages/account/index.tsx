/*
    Southampton University Formula Student Team
    Copyright (C) 2021 SUFST

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

// Module Imports
import React, { useCallback, useEffect} from 'react'

// Container
import AccountContainer from './container'

// Context
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from "redux/store";

import { logoutUser } from 'redux/slices/user';
import { useHistory } from 'react-router';

const Account = () => {
   const dispatch = useDispatch(); 
   const history = useHistory(); 

   const selectUser = (state: RootState) => state.user;
   const user = useSelector(selectUser);
   const { username } = user
  
   const onLogoutClick = useCallback(() => {
      dispatch(logoutUser()); 
   }, [dispatch]); 

   const onRegisterNewUser = useCallback(() => {
      history.push('/register'); 
   }, [history]); 

   useEffect(() => {
      if (username === undefined || username === 'anonymous') {
         history.push('/')
         return; 
      }

   }, [history, username])

   return (
      <>
          <AccountContainer user={user} onLogoutClick={onLogoutClick} onRegisterNewUser={onRegisterNewUser}/>
      </>
   )
}

export default Account
