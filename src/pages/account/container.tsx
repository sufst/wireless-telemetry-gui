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

// Material UI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button, Divider, List, ListItemText } from "@mui/material";
import { UserState } from "types/models/user";

// Styles
import { avatarStyle, subheaderStyle, useStyles } from "./styles";

const AccountContainer = (props: {
  user: UserState;
  onLogoutClick: () => void;
  onRegisterNewUser: () => void;
}) => {
  const classes = useStyles();

  const { onRegisterNewUser, onLogoutClick } = props;

  const user: UserState = props.user;

  const username = user.username;
  const privilege = user.privilege;
  const department = user.department;
  const creation = user.creation;

  // TODO: Remove force unwrapping here. Make it safer.
  const createdAt = new Date(creation! * 1000).toLocaleString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const subheaderProps = subheaderStyle(privilege);
  const avatarColorStyle = avatarStyle(privilege);

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={8}>
        <Card className={classes.cardRoot}>
          <CardHeader
            subheaderTypographyProps={subheaderProps}
            avatar={
              <Avatar aria-label="recipe" style={avatarColorStyle}>
                {username?.charAt(0).toUpperCase() ?? ""}
              </Avatar>
            }
            title={username}
            subheader={privilege}
          />
          <CardContent className={classes.list}>
            <List className={classes.list}>
              <ListItemText>
                <span>DEPARTMENT:</span> <span>{department}</span>
              </ListItemText>
              <ListItemText>
                <Typography variant="body2" color="textSecondary" component="p">
                  {`Account Created: ${createdAt}`}
                </Typography>
              </ListItemText>
            </List>
            <Divider className={classes.line} />
            <Button
              variant="contained"
              color="secondary"
              className={classes.btn}
              onClick={onLogoutClick}
            >
              LOG OUT
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.btn_register}
              onClick={onRegisterNewUser}
            >
              Register New User
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AccountContainer;
