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

// Material UI Imports
import { CSSObject, styled } from '@mui/material/styles';
import { PrivilegeColor, PrivilegeToColors } from "types/models/ui-types";
import MUIDivider from "@mui/material/Divider";
import MUICard from "@mui/material/Card";
import MUICardContent from "@mui/material/CardContent";
import MUIList from "@mui/material/List";
import MUIButton from "@mui/material/Button";
import { UserPrivilege } from "types/models/user";

const privilegeToColors: PrivilegeToColors = {
  Anon: "gray",
  Admin: "red",
  Basic: "gray",
  Developer: "green",
};

const privilegeFont = (privilege?: UserPrivilege) => {
  if (privilege === "Admin" || privilege === "Developer") {
    return 700;
  }

  return 400;
};

const getPrivilegeColor = (privilege?: UserPrivilege): PrivilegeColor => {
  const priv: keyof PrivilegeToColors = privilege ?? "Basic";

  return privilegeToColors[priv];
};

export const subheaderStyle = (privilege?: UserPrivilege) => {
  return {
    style: {
      color: getPrivilegeColor(privilege),
      fontWeight: privilegeFont(privilege),
    },
  };
};

export const avatarStyle = (privilege?: UserPrivilege) => {
  return {
    backgroundColor: getPrivilegeColor(privilege),
    color: "white",
  };
};

export const Divider = styled(MUIDivider)(()=>({
  marginTop: "20px",
}))

export const ProfileCard = styled(MUICard)(()=>({
  marginTop: "1em",
  backgroundColor: "#292929",
}));

const list = (): CSSObject => ({
  margin: "0px",
  paddingBottom: "0px",
  paddingTop: "0px",
});


export const ProfileContentWrapper = styled(MUICardContent)(()=>({
  ...list(),
}));

export const ProfileContent = styled(MUIList)(()=>({
  ...list(),
}));

export const LogOutButton = styled(MUIButton)(()=>({
  marginTop: "20px",
  backgroundColor: "red",
  color: "white",

  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  }
}));

export const RegisterButton = styled(MUIButton)(()=>({
  marginTop: "20px",
  marginLeft: "20px",
  backgroundColor: "green",
}));