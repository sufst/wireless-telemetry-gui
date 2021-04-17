import { REMOVE_ALERT } from "../alertSlide";

export const alertMiddleware = storeAPI => next => action => {
   
   if (action.type === 'alert/SHOW_ALERT') {
      
     setTimeout(() => {
        next(REMOVE_ALERT())
     }, action.payload.timeout)
     return next(action)
   }
 
   return next(action)
 }