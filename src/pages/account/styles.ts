// Material UI Imports
import { makeStyles } from '@material-ui/core/styles';
import { UserPrivilege } from 'redux/typing';
import { PrivilegeColor, PrivilegeToColors } from './typing';

const privilegeToColors: PrivilegeToColors = {
  Anon: 'gray',
  Admin: 'red',
  Basic: 'gray',
  Developer: 'green',
};

const privilegeFont = (privilege?: UserPrivilege) => {
  if (privilege === 'Admin' || privilege === 'Developer') {
    return 700; 
  }

  return 400; 
}

const getPrivilegeColor = (privilege?: UserPrivilege): PrivilegeColor => {
  const priv: keyof PrivilegeToColors = privilege ?? 'Basic'; 

  return privilegeToColors[priv]; 
}

export const subheaderStyle = (privilege?: UserPrivilege) => {
  return {
    style: {
      color: getPrivilegeColor(privilege),
      fontWeight: privilegeFont(privilege)
    }
  }
}

export const avatarStyle = (privilege?: UserPrivilege) => {
  return {
    backgroundColor: getPrivilegeColor(privilege)
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