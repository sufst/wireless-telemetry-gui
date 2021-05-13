// Material UI Imports
import { makeStyles } from '@material-ui/core/styles';
import { UserPrivilege } from 'redux/typing';

const privilegeColor = (privilege?: UserPrivilege) => {
  if (privilege === 'Admin') {
    return 'red'; 
  }

  if (privilege === 'Basic') {
    return 'gray'; 
  }

  if (privilege === 'Developer') {
    return 'green'; 
  }
}

const privilegeFont = (privilege?: UserPrivilege) => {
  if (privilege === 'Admin' || privilege === 'Developer') {
    return 700; 
  }

  return 400; 
}

export const subheaderStyle = (privilege?: UserPrivilege) => {
  return {
    style: {
      color: privilegeColor(privilege),
      fontWeight: privilegeFont(privilege)
    }
  }
}

export const avatarStyle = (privilege?: UserPrivilege) => {
  return {
    backgroundColor: privilegeColor(privilege)
  }
}

export const useStyles = makeStyles((theme) => ({
   cardRoot: {
     marginTop: '1em'
   },
   btn: {
      marginTop: '20px',
      backgroundColor: 'red'
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