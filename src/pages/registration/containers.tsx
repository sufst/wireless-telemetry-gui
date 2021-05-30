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

import { Container, CssBaseline, InputLabel, Select } from "@material-ui/core"
import { LoginButton, PasswordField, UsernameField } from "pages/signin/components";
import { useState } from "react";
import { UserDepartment, UserPrivilege } from "redux/typing";
import { RegisterFooter, RegisterHeader } from "./components";
import { useStyles } from "./styles"

export const RegisterContainer = () => {
   const classes = useStyles(); 

   const [department, setDepartment] = useState<UserDepartment> ('NON SPECIFIED')

   const [privilege, setPrivilege] = useState<UserPrivilege> ('Basic')

   const handleDepartmentChange = (event: any) => {
      setDepartment(event.target.value)   
   }

   const handlePrivilegeChange = (event: any) => {
      setPrivilege(event.target.value)
   }

   return (
      <Container component="main" maxWidth="xs">
         <CssBaseline />
         <div className={classes.paper}>
            <RegisterHeader />
            <form className={classes.form} noValidate onSubmit={() => console.log('smoethi')
            }>
               <UsernameField /> 
               <PasswordField label={'Password'}/>
               <PasswordField label={'Confirm Password'}/>
               <InputLabel htmlFor="department-select" className={classes.department_label}>Department</InputLabel>
               <Select
                  native
                  value={department}
                  onChange={handleDepartmentChange}
                  className={classes.department_select}
                  autoWidth={true}
                  inputProps={{
                     name: 'department',
                     id: 'department-select',
                  }}
               >
                  <option value={'Electronics'}>Electronics</option>
                  <option value={'Tier 1'}>Tier 1</option>
                  <option value={'Operations'}>Operations</option>
                  <option value={'Power-Train'}>Power-Train</option>
                  <option value={'Vehicle Performance'}>Vehicle Performance</option>
                  <option value={'Race Engineering'}>Race Engineering</option>
               </Select>
               <InputLabel htmlFor="privilege-select" className={classes.department_label}>Privilege Level</InputLabel>
               <Select
                  native
                  value={privilege}
                  onChange={handlePrivilegeChange}
                  className={classes.department_select}
                  autoWidth={true}
                  inputProps={{
                     name: 'privilege',
                     id: 'privilege-select',
                  }}
               >
                  <option value={'Admin'}>Admin</option>
                  <option value={'Basic'}>Basic</option>
                  <option value={'Developer'}>Developer</option>
               </Select>
               <div className={classes.btnContainer}>
                  <LoginButton text='Register' />
               </div>
            </form>
         </div>
         <RegisterFooter />
      </Container>
   )
}