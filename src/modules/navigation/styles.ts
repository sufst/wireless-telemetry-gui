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

import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from "@mui/material/AppBar";
import MUIIconButton from "@mui/material/IconButton";
import MUIButton from "@mui/material/Button";
import { styled, Theme, CSSObject } from '@mui/material/styles';

// The width of the drawer when opened
const DRAWER_WIDTH = 240;

//#region: appbar.tsx styles

const appBar = (theme: Theme): CSSObject => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: theme.palette.primary.dark,
});

const appBarShift = (theme: Theme): CSSObject => ({
  marginLeft: DRAWER_WIDTH,
  width: `calc(100% - ${DRAWER_WIDTH}px)`,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

export const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean; }>(({ theme, open }) => ({
    ...appBar(theme),
    ...(open && {
      ...appBarShift(theme),
    })
  }),
);


export const IconButton = styled(MUIIconButton, { shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean; }>(({ open }) => ({
      marginRight: 36,
      ...(open && {display: "none"}),
  }),
);


export const LogButton = styled(MUIButton, {shouldForwardProp: (prop) => prop !== "username",
})<{username?:string;}>(({username}) => ({
  backgroundColor: "red",
  color:"white",
  ...(username === "anonymous" && {
    backgroundColor: "green",
  })
}))


//#endregion;


//#region: navigation.tsx styles;

export const NavigationRoot:any = styled('div')(({ theme }) => ({
  display: 'flex',
}));

//#endregion


//#region: sidebar.tsx styles;

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export const DrawerHeader:any = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

//#endregion;

