import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
   },
   menuButton: {
      marginRight: theme.spacing(2),
   },
   title: {
      marginLeft: theme.spacing(4), 
      flexGrow: 1,
   },
   appBar: {
      marginBottom: theme.spacing(2), 
   }
}));