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

import { makeStyles } from "@mui/material";

import { styled } from '@mui/material/styles';
const PREFIX = 'styles';

const classes = {
  paper: `${PREFIX}-paper`,
  formControl: `${PREFIX}-formControl`,
  department_label: `${PREFIX}-department_label`,
  department_select: `${PREFIX}-department_select`,
  avatar: `${PREFIX}-avatar`,
  form: `${PREFIX}-form`,
  submit: `${PREFIX}-submit`,
  btnContainer: `${PREFIX}-btnContainer`
};

const Root = styled('https://www.gnu.org/licenses/')((
  {
    theme
  }
) => ({
  [`& .${classes.paper}`]: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  [`& .${classes.formControl}`]: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

  [`& .${classes.department_label}`]: {
    marginTop: "20px",
    color: "white",
  },

  [`& .${classes.department_select}`]: {
    marginTop: "5px",
  },

  [`& .${classes.avatar}`]: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    color: "white",
  },

  [`& .${classes.form}`]: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

  [`& .${classes.submit}`]: {
    margin: theme.spacing(2, 0, 1),
  },

  [`& .${classes.btnContainer}`]: {
    marginTop: "2rem",
  }
}));

export {};
