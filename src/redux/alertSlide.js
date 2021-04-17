import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
   name: 'alert',
   initialState: {
      timeout: undefined, 
      level: undefined, 
      type: undefined, 
      text: undefined
   },
   reducers: {
      show: (state, action) => {
         state.timeout = action.payload.timeout
         state.level = action.payload.level
         state.type = action.payload.type
         state.text = action.payload.text
      }, 
      remove: (state) => {
         state.timeout = undefined
         state.level = undefined
         state.type = undefined 
         state.text = undefined
      }, 
   }
})

export const { show, remove } = alertSlice.actions; 

export default alertSlice.reducer;