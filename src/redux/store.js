import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import alertReducer from './slices/alertSlice'
import { alertMiddleware } from './middleware/alert';

const store = configureStore({
  reducer: {
     alert: alertReducer, 
  },
  middleware: [alertMiddleware, ...getDefaultMiddleware()],
})

export default store; 