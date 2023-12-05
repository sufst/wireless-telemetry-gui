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

import { styled } from '@mui/material/styles';
import MUIAvatar from '@mui/material/Avatar';
import MUIInputLabel from "@mui/material/InputLabel";

export const Avatar = styled(MUIAvatar)(({theme})=>({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
  color: "white",
}))

export const RegisterPaper = styled("div")(({theme})=>({
  marginTop: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}))

export const RegistrationForm = styled("form")(({theme})=>({
  width: "100%", // Fix IE 11 issue.
  marginTop: theme.spacing(1),
}))

export const DepartmentLabel = styled(MUIInputLabel)(()=>({
  marginTop: "20px",
  color: "white",
}))