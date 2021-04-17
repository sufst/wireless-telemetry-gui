import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import alertReducer from './alertSlide'
import { alertMiddleware } from './middleware/alert';

const store = configureStore({
  reducer: {
     alert: alertReducer, 
  },
  middleware: [alertMiddleware, ...getDefaultMiddleware()],
})

export default store; 