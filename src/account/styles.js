// Material UI Imports
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
   cardRoot: {
     //maxWidth: 345,
   },
   btn: {
      marginTop: '10px'
   },
   avatar: {
     backgroundColor: red[500],
   },
}));