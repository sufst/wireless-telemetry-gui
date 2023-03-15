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

import React, { useCallback, useState } from "react";
import { Container, CssBaseline } from "@material-ui/core";
import { createAlert } from "modules/alert/alert";
import {
  LoginButton,
  PasswordField,
  UsernameField,
} from "pages/signin/components";
import { useDispatch } from "react-redux";
import { showAlert } from "redux/slices/alert";
import { UserRegister } from "types/models/actions";
import { UserDepartment, UserPrivilege } from "types/models/user";
import {
  DepartmentSelect,
  PrivilegeSelect,
  RegisterFooter,
  RegisterHeader,
} from "./components";
import { useStyles } from "./styles";

export const RegisterContainer: React.FC<{ registerUser: UserRegister }> = (props) => {
  const classes = useStyles();

  const { registerUser } = props;

  const dispatch = useDispatch();

  const [department, setDepartment] =
    useState<UserDepartment>("Electronics");

  const [privilege, setPrivilege] = useState<UserPrivilege>("Basic");

  const handleDepartmentChange = React.useCallback((event: any) => {
    setDepartment(event.target.value);
  }, []);

  const handlePrivilegeChange = React.useCallback((event: any) => {
    setPrivilege(event.target.value);
  }, []);

  const onRegisterSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const username: string = event.target.username.value;
      const password: string = event.target.password.value;
      const confirmPass: string = event.target.passconfirm.value;

      if (username === "" || password === "" || confirmPass === "") {
        const emptyFieldAlert = createAlert(
          3000,
          "error",
          "alert",
          "Please fill all fields."
        );
        dispatch(showAlert(emptyFieldAlert));
        return;
      }

      if (password === confirmPass) {
        registerUser(username, password, privilege, department);
        return;
      }

      const mismatchPassAlert = createAlert(
        3000,
        "error",
        "alert",
        "The passwords don't match."
      );
      dispatch(showAlert(mismatchPassAlert));
    },
    [department, privilege, dispatch, registerUser]
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <RegisterHeader />
        <form className={classes.form} noValidate onSubmit={onRegisterSubmit}>
          <UsernameField />
          <PasswordField label="Password" id={"password"} />
          <PasswordField label="Confirm Password" id={"passconfirm"} />
          <DepartmentSelect
            department={department}
            handleDepartmentChange={handleDepartmentChange}
          />
          <PrivilegeSelect
            privilege={privilege}
            handlePrivilegeChange={handlePrivilegeChange}
          />
          <div className={classes.btnContainer}>
            <LoginButton text="Register" />
          </div>
        </form>
      </div>
      <RegisterFooter />
    </Container>
  );
};
