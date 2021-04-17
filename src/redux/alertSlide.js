import { createSlice } from "@reduxjs/toolkit";

export const alertSlide = createSlice({
   name: 'alert',
   initialState: {
      timeout: undefined, 
      level: undefined, 
      type: undefined, 
      text: undefined
   },
   reducers: {
      SHOW_ALERT: (state, action) => {
         state.timeout = action.payload.timeout
         state.level = action.payload.level
         state.type = action.payload.type
         state.text = action.payload.text
      }, 
      REMOVE_ALERT: (state) => {
         console.log('REMOVING');
         state.timeout = undefined
         state.level = undefined
         state.type = undefined 
         state.text = undefined
      }, 
   }
})

export const { SHOW_ALERT, REMOVE_ALERT } = alertSlide.actions; 

export default alertSlide.reducer;