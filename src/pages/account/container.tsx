// Module Imports 
import React from 'react'

// Material UI Imports
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Button, Divider, List, ListItemText } from '@material-ui/core';
import type { UserDepartment, UserState } from "redux/typing";

// Styles 
import { avatarStyle, subheaderStyle, useStyles } from './styles';

const AccountContainer = (props: { user: UserState, onLogoutClick: () => void}) => {
   const classes = useStyles();
   
   const user: UserState = props.user; 

   const username = user.username; 
   const privilege = user.privilege;
   
   const creation = user.creation; 
   
   // TODO: Remove force unwrapping here. Make it safer. 
   const createdAt = new Date(creation!! * 1000).toLocaleString('en-GB', {day: 'numeric', month: 'numeric', year: 'numeric'});

   const department: UserDepartment = 'NON SPECIFIED'

   const subheaderProps = subheaderStyle(privilege);
   const avatarColorStyle = avatarStyle(privilege);

   return (
      <Grid
         container
         spacing={0}
         direction="row"
         justify="center"
         style={{ minHeight: '100vh' }}
      >
         <Grid item xs={8}>
            <Card className={classes.cardRoot}>
               <CardHeader subheaderTypographyProps={subheaderProps}
                  avatar={
                     <Avatar aria-label="recipe" style={avatarColorStyle}>
                        {username?.charAt(0).toUpperCase() ?? 'B'}
                     </Avatar>
                  }
                  title={username}
                  subheader={privilege}
               />
               <CardContent className={classes.list}>
                  <List className={classes.list}>
                     <ListItemText>
                        <span className={classes.deptTitle}>DEPARTMENT:</span> <span className={classes.dept}>{department}</span>
                     </ListItemText>
                     <ListItemText>
                        <Typography variant="body2" color="textSecondary" component="p">
                           {`Account Created: ${createdAt}`}
                        </Typography>
                     </ListItemText>
                  </List>
                  <Divider className={classes.line} />
                  <Button variant="contained" color="secondary" className={classes.btn} onClick={props.onLogoutClick}>
                     LOG OUT
                  </Button>
               </CardContent>
            </Card>
         </Grid>      
      </Grid>
   )
}

export default AccountContainer
