// Module Imports 
import React from 'react'

// Material UI Imports
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Button, Divider, List, ListItemText } from '@material-ui/core';

// Styles 
import { useStyles } from './styles';

const AccountContainer = ({ user, onLogoutClick }) => {
   const classes = useStyles();
   const { username, meta } = user; 

   // const { lastLogin, createdAt, dept } = meta;
   //const subtitleText = `${meta.accountType} • ${meta.createdAt} • ${meta.lastLogin}`
   const subtitleText = `Regular User • Last Login: Mar 21th • Created: Feb 30th`

   return (
      <Card className={classes.cardRoot}>
         <CardHeader
            avatar={
               <Avatar aria-label="recipe" className={classes.avatar}>
                  {username?.charAt(0).toUpperCase() ?? 'B'}
               </Avatar>
            }
            title={username ?? "BOB BEANS"}
            subheader='Admin • Tier 1'
         />
         <CardContent className={classes.list}>
            <List className={classes.list}>
               <ListItemText>
                  <span className={classes.deptTitle}>DEPARTMENT:</span> <span className={classes.dept}>{meta.dept ?? "ELECTRONICS"}</span>
               </ListItemText>
               <ListItemText>
                  <Typography variant="body2" color="textSecondary" component="p">
                     Last Login: {meta.lastLogin ?? 'March 25th'} 
                  </Typography>
               </ListItemText>
               <ListItemText>
                  <Typography variant="body2" color="textSecondary" component="p">
                     Account Created: {meta.createdAt ?? 'March 25th'} 
                  </Typography>
               </ListItemText>
            </List>
            <Divider className={classes.line} />
            <Button variant="contained" color="secondary" className={classes.btn} onClick={onLogoutClick}>
               LOG OUT
            </Button>
         </CardContent>
      </Card>
   )
}

export default AccountContainer
