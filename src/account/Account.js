// Module Imports 
import React from 'react'

// Material UI Imports
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

// Styles 
import { useStyles } from './styles';

const Account = () => {
   const classes = useStyles();

   return (
      <Card className={classes.cardRoot}>
         <CardHeader
            avatar={
               <Avatar aria-label="recipe" className={classes.avatar}>
                  B
               </Avatar>
            }
            title="BOB BEANS"
            subheader="Regular User"
         />
         <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quae corrupti architecto itaque officiis illo rerum? Tenetur porro soluta, minus dolore iusto molestias. Quisquam qui laudantium aliquid ab, error dolores.
            </Typography>
            <Button variant="contained" color="secondary" className={classes.btn}>
               LOG OUT
            </Button>
         </CardContent>
      </Card>
   )
}

export default Account
