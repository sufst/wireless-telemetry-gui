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

import { styled } from "@mui/material/styles";
import MUITableCell from "@mui/material/TableCell";
import MUIAvatar from "@mui/material/Avatar";
import MUITypography from "@mui/material/Typography"
import { UserPrivilege } from "types/models/user";

export const getColorForPrivelege = (privilege: UserPrivilege) => {
  switch (privilege) {
    case "Admin":
      return "red";
    case "Anon":
      return "blue";
    case "Basic":
      return "#3399FF";
    case "Developer":
      return "yellow";
    default:
      break;
  }
};

export const TableHeaderCell = styled(MUITableCell)(({theme})=>({
  fontWeight: "bold",
  fontSize: "1rem",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.getContrastText(theme.palette.primary.dark),
}))

export const Avatar = styled(MUIAvatar)(({theme})=>({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.getContrastText(theme.palette.primary.light),
}))

export const Username = styled(MUITypography)(()=>({
  fontWeight: "bold",
  marginLeft: "1.2rem",
  paddingTop: "0.5rem",
  color: "white",
}))

export const AdminPanel = styled("div")(()=>({
  margin: "10px 10px",
  marginBottom: "3rem",
}))