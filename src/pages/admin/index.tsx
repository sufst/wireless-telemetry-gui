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

import { fetchAllUsers } from 'modules/api/users';
import { useCallback } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from 'redux/store';
import { UserState } from 'types/models/user';
import { AdminPanelContainer } from './containers';

const Admin = () => {
   const history = useHistory(); 

   const selectUser = (state: RootState) => state.user;
   const user = useSelector(selectUser);

   const [users, setUsers] = useState<UserState[]>([]);

   const privilege = user.privilege; 
   const token = user.accessToken; 

   const fetchUsers = useCallback(async () => {
      if (token === undefined) {
         return
      }
      
      const users = await fetchAllUsers(token);
      setUsers(users['users']);
      
   }, [token])

   useEffect(() => {
      if (privilege === 'Anon' || privilege === 'Basic') {
         history.push('/')
         return; 
      }

      fetchUsers(); 
   }, [history, privilege, fetchUsers])

   return (
      <AdminPanelContainer users={users} />
   )
}

export default Admin;
