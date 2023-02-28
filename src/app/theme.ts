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

import { createMuiTheme } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

declare module '@material-ui/core/styles/createBreakpoints' {
   interface BreakpointOverrides {
     xs: true;
     sm: true;
     md: true;
     lg: true;
     xl: true;
     xxl: true;
   }
 }

const theme = createMuiTheme({
   palette: {
      type: 'dark',
      primary: blue
   },
   breakpoints: {
      values: {
         lg: 1280,
         md: 960,
         sm: 700,
         xl: 1920,
         xs: 0,
         xxl: 2000,
      },
   },
})

export default theme; 