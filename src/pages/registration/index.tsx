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

import { createAlert } from "modules/alert/alert";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router";
import { showAlert } from "redux/slices/alert";
import { RootState } from "redux/store";
import { RegisterContainer } from "./containers";

import { registerNewUser } from 'redux/slices/user';
import { UserRegister } from "types/models/actions";


export const Register = () => {
   const dispatch = useDispatch(); 
   const history = useHistory();

   const selectUser = (state: RootState) => state.user;
   const user = useSelector(selectUser);

   const privilege = user.privilege; 

   useEffect(() => {
      if (privilege === 'Anon' || privilege === 'Basic') {   
         const cannotRegisterUserAlert = createAlert(3000, "error", "alert", "You cannot create a new user. Sorry :("); 
         dispatch(showAlert(cannotRegisterUserAlert));
        
         history.push('/'); 
      } 
   }, [dispatch, user, privilege, history])

   const registerUser: UserRegister = useCallback((username, password, privilege, department) => {
      const newUser = { username, password, privilege, department }; 
      dispatch(registerNewUser(newUser)); 
   }, [dispatch])

   return (
      <>
         <RegisterContainer  registerUser={registerUser}/>
      </>
      
   )
}