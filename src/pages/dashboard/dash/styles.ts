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

import MUIBox from "@mui/material/Box";
import MUIGrid from "@mui/material/Grid";
import MUIPaper from "@mui/material/Paper";
import { CSSObject, styled } from '@mui/material';


//#region components.tsx styles

export const Box = styled(MUIBox)(()=>({
  color: "white",
  overflow: "hidden",
  height: "120px",
  fontSize: "20px",
  borderRadius: "10px",
  backgroundColor: "green",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}));

export const StatusItem = styled(MUIGrid)(()=>({
  item: {
    height: "130px",
  },
}));

export const StatusText = styled('span')(()=>({
  fontWeight: "bold",
}));

export const SensorBox = styled(MUIBox)(()=>({
  color: "white",
  overflow: "hidden",
  height: "120px",
  textAlign: "center",
  fontSize: "20px",
  borderRadius: "10px",
  backgroundColor: "black",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}));

export const SensorLastValue = styled('span')(()=>({
  fontWeight:"bold",
}));

export const DashHeader = styled('p')(()=>({
  margin: "0",
  marginBottom: "0.5rem",
  fontSize: "20px",
}));

export const GridContainer = styled(MUIGrid)({
  marginBottom: "0.5rem",
})

export const CurrentSessionBoxWrapper = styled(MUIBox,
   {shouldForwardProp: (prop) => prop !== "bgColor",})<{ bgColor?:string;}>(({bgColor})=>({
  color: "white",
  overflow: "hidden",
  height: "80px",
  textAlign: "center",
  fontSize: "20px",
  fontWeight: "bold",
  borderRadius: "10px",
  backgroundColor:   bgColor ? bgColor : "gray",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}))

//#endregion

//#region container.tsx styles

export const Paper = styled(MUIPaper)({
  flexGrow: 1,
  padding: "1rem",
  marginBottom: "1rem",
  marginTop: "1rem",
  background: "#292929",
})

export const Grid = styled(MUIGrid)({
  marginBottom: "0.5rem",
})

//#endregion


//#region session buttons


// type interface for classes dictionary
type Styles = {
  [key : string] : CSSObject,
}

const sessionButtonBox : CSSObject = {
  color: "white",
  overflow: "hidden",
  height: "80px",
  textAlign: "center",
  fontSize: "20px",
  fontWeight: "bold",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}

const sessionButtonHover : CSSObject = {
  "&:hover": {
    cursor: "pointer",
    filter: "brightness(125%)",
  },
}

export const sessionButtonClasses : Styles = {
  "sessionButtonStopBox" : {
    ...sessionButtonBox,

    backgroundColor: "darkOrange",

    ...sessionButtonHover,
  },
  "sessionButtonStopBoxDisabled" : {
    ...sessionButtonBox,

    backgroundColor: "darkGray",
    opacity: "60%",
  },
  "sessionButtonStartBox" : {
    ...sessionButtonBox ,

    backgroundColor: "green",

    ...sessionButtonHover,
  },
  "sessionButtonStartBoxDisabled" : {
    ...sessionButtonBox,

    backgroundColor: "darkGray",
    opacity: "60%",
  }
}

//#endregion