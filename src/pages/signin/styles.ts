/*
    Southampton University Formula Student Team
    Copyright (C) 2021 Nathan Rowley-Smith

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
import MUIButton from "@mui/material/Button";
import MUIAvatar from "@mui/material/Avatar";

export const SignInPaper = styled('div')(({theme})=>({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const SignInForm = styled('form')(({theme})=>({
  width: "100%", // Fix IE 11 issue.
  marginTop: theme.spacing(1),
}))

export const ButtonContainer = styled('div')(()=>({
  marginTop: "2rem",
}))

export const SubmitButton = styled(MUIButton)(({theme})=>({
  margin: theme.spacing(2, 0, 1),
}))

export const Avatar = styled(MUIAvatar)(({theme})=>({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}))
