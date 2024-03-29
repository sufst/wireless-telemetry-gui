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
import Divider from "@mui/material/Divider";
import GetAppIcon from "@mui/icons-material/GetApp";
import { ListItemButton } from "@mui/material"
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { useState } from "react";

const InstallPwaListItem = (props: { key: string }) => {
  const [show, setShow] = useState(false);
  const [deferredPrompt, setDeferredPrompt]: any = useState(null);
  window.addEventListener("beforeinstallprompt", (event: Event) => {
    setShow(true);
    setDeferredPrompt(event);
  });
  const onButtonClick = async () => {
    if (deferredPrompt !== null) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
        setShow(false);
      }
    }
  };
  if (show) {
    return (
      <>
        <Divider />
        <ListItemButton
          key={props.key}
          onClick={onButtonClick}
        >
          <ListItemIcon>
            <GetAppIcon />
          </ListItemIcon>
          <ListItemText>
            Install
          </ListItemText>
        </ListItemButton>
      </>
    );
  } else {
    return <></>;
  }
};

export default InstallPwaListItem;
