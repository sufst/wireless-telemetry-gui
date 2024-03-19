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

import React, { useCallback, useEffect, useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import { createAlert } from "modules/alert/alert";
import {
  LoginButton,
  PasswordField,
  UsernameField,
} from "pages/signin/components";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "redux/slices/alert";
import { SetUserAction } from "types/models/actions";
import { UserDepartment, UserPrivilege } from "types/models/user";
import {
  DepartmentSelect,
  PrivilegeSelect,
  RegisterFooter,
  RegisterHeader,
} from "./components";
import { RegistrationForm, RegisterPaper } from "./styles";
import { userPatch } from "modules/api/user";
import { RootState } from "redux/store";
import { usersPatch } from "modules/api/users";

export const ModifyUserContainer: React.FC<{ user: SetUserAction | undefined }> = (
  props
) => {

  const { user } = props;

  const selectUser = (state: RootState) => state.user;
  const currentUser = useSelector(selectUser);

  const token = currentUser.accessToken

  const dispatch = useDispatch();

  const [username, setUsername] = useState<string>("");
  const [department, setDepartment] = useState<UserDepartment>("Electronics");
  const [privilege, setPrivilege] = useState<UserPrivilege>("Basic");

  const handleDepartmentChange = useCallback((event: any) => {
    setDepartment(event.target.value);
  }, []);

  const handlePrivilegeChange = useCallback((event: any) => {
    setPrivilege(event.target.value);
  }, []);

  useEffect(() => {
    console.log(user)
    if (user) {
      setDepartment(user.department)
      setPrivilege(user.privilege)
      setUsername(user.username)
    }
  }, [user])



  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const username: string = event.target.username.value;
      const password: string = event.target.password.value;
      const confirmPass: string = event.target.passconfirm.value;

      interface Fields {
        [key: string]: string;
      }

      const defaultFields : Fields = {
        username: username,
        password: password,
        department: department,
        privilege: privilege
      };

      const patchFields: Fields = {};

      for (const [key, value] of Object.entries(defaultFields)) {
        if (value !== '') {
          switch (key) {
            case "department":
              if (value !== user?.department) {
                patchFields[key] = value;
              }
              break;
            case "privilege":
              if (value !== user?.privilege) {
                patchFields[key] = value;
              }
              break;
            case "username":
              if (value !== user?.username) {
                patchFields[key] = value;
              }
              break;
            // Add other cases as needed
            default:
              patchFields[key] = value;
              break;
          }
        }
      }



      if (username === "") {
        const emptyFieldAlert = createAlert(
          3000,
          "error",
          "alert",
          "Please fill all fields."
        );
        dispatch(showAlert(emptyFieldAlert));
        return;
      }

      // console.log(username, password, confirmPass, department, privilege)

      if (password !== confirmPass) {
        const mismatchPassAlert = createAlert(
          3000,
          "error",
          "alert",
          "The passwords don't match."
        );
        dispatch(showAlert(mismatchPassAlert));
      }

      console.log(patchFields)

      //todo
    if (token && user) {
      usersPatch(user.username, token, patchFields);
    }
    },
    [department, privilege, dispatch]
  );

  // TODO create a loading page to let user get loaded first
  if (!user) {
    return(
      <div>Loading</div>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <RegisterPaper>
        <RegisterHeader />
        {/* TODO Change form to be more scalable rather than stock html form */}
        <RegistrationForm noValidate onSubmit={onSubmit}>
          <UsernameField value={username} onChange={setUsername}/>
          <PasswordField label="New Password" id={"password"} />
          <PasswordField label="Confirm Password" id={"passconfirm"} />
          <DepartmentSelect
            department={department}
            handleDepartmentChange={handleDepartmentChange}
          />
          <PrivilegeSelect
            privilege={privilege}
            handlePrivilegeChange={handlePrivilegeChange}
          />
          <div style={{marginTop: "2rem"}}>
            <LoginButton text="Register" />
          </div>
        </RegistrationForm>
      </RegisterPaper>
      <RegisterFooter />
    </Container>
  );
};
