/*
    Southampton University Formula Student Team
    Copyright (C) SUFST

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

import { Box, Button, CSSObject, Paper, styled, TextField } from "@mui/material";
import MUITypo from "@mui/material/Typography";

// export const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       width: "100%",
//       margin: "0",
//     },
//     heading: {
//       fontSize: theme.typography.pxToRem(15),
//     },
//     startStopBtn: {
//       marginLeft: "1rem",
//     },
//     newSessionWrapper: {
//       margin: "1rem 1rem 0 1rem",
//       backgroundColor: "#292929",
//     },
//     newSessionSubmitBtn: {
//       marginLeft: "0.5rem",
//     },
//     newSessionTextFieldMargin: {
//       marginLeft: "1rem",
//       marginBottom: "1rem",
//       width: "200px",
//     },
//     sessionName: {
//       fontWeight: "bold",
//     },
//     rootSessionPaper: {
//       marginTop: "1rem",
//     },
//     sessionHeadingContainer: {
//       display: "flex",
//       marginBottom: "1rem",
//     },
//     gridContainer: {
//       marginBottom: "0.5rem",
//     }
//   })
// );

// type interface for classes dictionary
type Styles = {
  [key : string] : CSSObject,
}

//#region containers.tsx styles

export const RootPaper = styled(Paper)(({
  flexGrow: 1,
  padding: "1rem",
  marginBottom: "1rem",
  marginTop: "1rem",
  background: "#292929",
}))

//#endregion

//#region components.tsx styles

export const CurrentSessionTypography = styled(MUITypo)({
  textAlign: "center"
})

export const SessionAlreadyRunning = styled("p")({
  marginTop: "-10px",
  fontWeight: "bold",
  color: "red",
  opacity: "70%",
})

export const SessionHeadingContainer = styled("div")({
  display: "flex",
  marginBottom: "1rem",
})

export const RefreshButton = styled(Button)({
  backgroundColor: "green",
})

export const SensorChooserBox = styled(Box)({
  marginBottom: "1rem",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
})

export const SessionButtonBox = styled(Box,
  {shouldForwardProp : (prop) => prop != "type" && prop != "disabled",})<{type : "start" | "stop", disabled : boolean}>(({type, disabled})=>({
    color: "white",
    overflow: "hidden",
    height: "80px",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
    borderRadius: "10px",
    backgroundColor: disabled ? "darkGray" : type == "start" ? "green" : "darkOrange",
    opacity : disabled ? "60%" : "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    "&:hover": disabled ? "" : {
      cursor: "pointer",
      filter: "brightness(125%)",
    },
}))

export const NewSessionTextField = styled(TextField,
  {shouldForwardProp : (prop) => prop != "leftMargin",})<{leftMargin : boolean}>(({leftMargin})=>({
    marginLeft: leftMargin ? "1rem" : "0rem",
    marginBottom: "1rem",
    width: "200px",
  }))


export const NewSessionText = styled("p",
  {shouldForwardProp : (prop) => prop != "header",})<{header : boolean}>(({header})=>({
    margin: "auto",
    flexGrow: 1,
    fontSize: "20px",
    marginBottom: header ? "1rem" : "0rem",
  }))

//#endregion

//#region Session Table Styles


export const sessionTableClasses : Styles = {
  "headerText": {
    fontWeight: "bold",
    fontSize: "20px",
  },
  "plainText": {
    fontSize: "18px",
  },
  "aliveStatusText": {
    fontSize: "18px",
    color: "green",
  },
  "deadStatusText": {
    fontSize: "18px",
    color: "red",
  },
}

//#endregion
