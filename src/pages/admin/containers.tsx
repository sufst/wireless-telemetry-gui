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

import { UserState } from 'types/models/user';
import { AdminPanelTable } from './components';
import { useStyles } from "./styles";

export const AdminPanelContainer = (props: { users: UserState[]}) => {
   const classes = useStyles(); 

   return (
      <div className={classes.adminPanelContainer}>
         <h2>Admin Panel</h2>
         <AdminPanelTable users={props.users}/> 
      </div>
   )
}

