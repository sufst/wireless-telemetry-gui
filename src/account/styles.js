// Material UI Imports
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
   cardRoot: {
     //maxWidth: 345,
   },
   btn: {
      marginTop: '20px',
      backgroundColor: 'red'
   },
   avatar: {
     backgroundColor: 'red',
   },
   list: {
     margin: '0px',
     paddingBottom: '0px',
     paddingTop: '0px'
   },
   line: {
     marginTop: '20px'
   },
   deptTitle: {
    color: 'black',
    fontWeight: 'bold'
  },
  dept: {
    color: 'black',
  },
}));