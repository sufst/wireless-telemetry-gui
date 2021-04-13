import React, { useReducer } from 'react'

import AlertContext from './alertContext'
import AlertReducer from './alertReducer'

const AlertState = (props) => {
   const initialState = {
      timeout: undefined, 
      level: undefined, 
      type: undefined, 
      text: undefined
   } 

   const [state, dispatch] = useReducer(AlertReducer, initialState)

   // Set Alert 
   const setAlert = (level, type, timeout, text) => {
      dispatch({
         type: "SET_ALERT",
         payload: { level, type, timeout, text }
      })

      setTimeout(() => {
         dispatch({
            type: "REMOVE_ALERT",
            payload: { level: undefined, type: undefined, timeout: undefined, text: undefined }
         })
      }, timeout)
   } 

   return <AlertContext.Provider value={{
      alert: state, 
      setAlert: setAlert
   }}>
      {props.children}
   </AlertContext.Provider>
}

export default AlertState