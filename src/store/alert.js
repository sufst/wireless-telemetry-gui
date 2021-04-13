// React Imports
import { 
   createContext, 
   useReducer, 
   useContext 
} from 'react';

export const AlertStore = createContext(); 

const AlertStoreReducer = (state, action) => {
   switch (action.method) {
      case "SET_ALERT":
         return {
            text: action.text, 
            type: action.type,
            timeout: action.timeout
         }
      case "REMOVE_ALERT":
         return {
            text: undefined, 
            type: undefined,
            timeout: undefined
         }
      default:
         throw new Error();
   }
}

export const useAlertStoreReducer = (type, text) => {
   return useReducer(AlertStoreReducer, {
      type: undefined, 
      text: undefined,
      timeout: undefined
   })
}

export function useAlertStoreDispatcher() {
   return useContext(AlertStore).dispatch;
}

export function useAlert() {
   return useContext(AlertStore).state;
}

export const setAlert = () => {
   console.log('Setting an alert');
}