// React Imports
import { 
   createContext, 
   useReducer, 
   useContext 
} from 'react';

export const AlertStore = createContext(); 

const AlertStoreReducer = (state, action) => {
   console.log('IN REDUCER');
   switch (action.method) {
      case "SET_ALERT":
         console.log(action);
         return {
            text: action.text, 
            type: action.type,
         }
      case "REMOVE_ALERT":
         return {
            text: undefined, 
            type: undefined,
         }
      default:
         throw new Error();
   }
}

export const useAlertStoreReducer = (type, text) => {
   return useReducer(AlertStoreReducer, {
      type: undefined, 
      text: undefined,
   })
}

export function useAlertStoreDispatcher() {
   return useContext(AlertStore).dispatch;
}

export function useAlert() {
   return useContext(AlertStore).state;
}