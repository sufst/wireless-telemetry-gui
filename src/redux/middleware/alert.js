import { remove } from "../slices/alertSlice";

export const alertMiddleware = storeAPI => next => action => {
   
   if (action.type === 'alert/show') {

     setTimeout(() => {
        next(remove())
     }, action.payload.timeout)
     return next(action)
   }
 
   return next(action)
 }