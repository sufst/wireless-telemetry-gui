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
import Grid from "@mui/material/Grid";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { ListItemText } from "@mui/material";
import { UserState } from "types/models/user";

// Styles
import {  Divider,
          LogOutButton,
          ProfileCard,
          ProfileContent,
          ProfileContentWrapper,
          RegisterButton,
          avatarStyle,
          subheaderStyle } from "./styles";

const AccountContainer = (props: {
  user: UserState;
  onLogoutClick: () => void;
  onRegisterNewUser: () => void;
}) => {

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
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={8}>
        <ProfileCard>
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
          <ProfileContentWrapper>
            <ProfileContent>
              <ListItemText>
                <span>DEPARTMENT:</span> <span>{department}</span>
              </ListItemText>
              <ListItemText>
                <Typography variant="body2" color="textSecondary" component="p">
                  {`Account Created: ${createdAt}`}
                </Typography>
              </ListItemText>
            </ProfileContent>
            <Divider />
            <LogOutButton
              variant="contained"
              color="secondary"
              onClick={onLogoutClick}
            >
              LOG OUT
            </LogOutButton>
            <RegisterButton
              variant="contained"
              color="primary"
              onClick={onRegisterNewUser}
            >
              Register New User
            </RegisterButton>
          </ProfileContentWrapper>
        </ProfileCard>
      </Grid>
    </Grid>
  );
};

export default AccountContainer;
