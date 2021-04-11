// Material UI Labs Imports
import MuiAlert from '@material-ui/lab/Alert';

// Context Imports
import { useAlert } from '../store/alert';

const Alert = (props) => {
   const alert = useAlert(); 

   const { type, text } = alert; 

   return (
       type !== undefined && (
           <MuiAlert elevation={6} variant="filled" {...props} severity={type}>
               {text ?? 'Some dummy text'}
           </MuiAlert>
       )
   )
}

export default Alert; 