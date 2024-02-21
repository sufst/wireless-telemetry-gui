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

// Module Imports
import React from "react";
import { Snackbar } from "@mui/material";
// import { Alert } from "@mui/material";
import { useSelector } from "react-redux";

// Styles
import { Alert } from "./styles";

// Redux Imports
import type { RootState } from "redux/store";

const OfflineBanner = () => {
  // const classes = useStyles();
  return (
    <Alert
      elevation={6}
      variant="filled"
      severity="error"
    >
      Lost connection to the server
    </Alert>
  );
};

const AlertContainer: React.FC = () => {

  const selectAlert = (state: RootState) => state.alert;
  const { text, type, timeout, level } = useSelector(selectAlert);
  const offline = useSelector((state: RootState) => state.app.offline);

  if (type !== undefined) {
    return type === "snack" ? (
      <Snackbar open={type === "snack"} autoHideDuration={timeout}>
        <Alert
          elevation={6}
          variant="filled"
          severity={level}
        >
          {text ?? ""}
        </Alert>
      </Snackbar>
    ) : (
      <Alert
        elevation={6}
        variant="filled"
        severity={level}
      >
        {text ?? ""}
      </Alert>
    );
  } else if (offline) {
    return <OfflineBanner />;
  } else {
    return null;
  }
};

export default AlertContainer;
