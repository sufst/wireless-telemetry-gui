// Module Imports 
import React from 'react'

// Material UI Imports
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Button, Divider, List, ListItemText } from '@material-ui/core';
import type { UserState } from "redux/typing";

// Styles 
import { useStyles } from './styles';

const AccountContainer = (props: { user: UserState, onLogoutClick: () => void}) => {
   const classes = useStyles();
   
   const user: UserState = props.user; 

   const username = user.username; 
   const privilege = user.privilege;
   
   const creation = user.creation; 
   // TODO: Remove force unwrapping here. Make it safer. 
   const createdAt = new Date(creation!! * 1000).toLocaleString('en-GB', {day: 'numeric', month: 'numeric', year: 'numeric'});

   return (
      <Card className={classes.cardRoot}>
         <CardHeader
            avatar={
               <Avatar aria-label="recipe" className={classes.avatar}>
                  {username?.charAt(0).toUpperCase() ?? 'B'}
               </Avatar>
            }
            title={username ?? "BOB BEANS"}
            subheader={privilege + ' • Full Privileges'}
         />
         <CardContent className={classes.list}>
            <List className={classes.list}>
               <ListItemText>
                  <span className={classes.deptTitle}>DEPARTMENT:</span> <span className={classes.dept}>{"ELECTRONICS"}</span>
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
   )
}

export default AccountContainer
