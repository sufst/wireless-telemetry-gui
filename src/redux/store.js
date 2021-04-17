import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import alertReducer from './slices/alertSlice';
import sensorsReducer from './slices/sensors';
import { alertMiddleware } from './middleware/alert';

const store = configureStore({
  reducer: {
     alert: alertReducer, 
     sensors : sensorsReducer
  },
  middleware: [alertMiddleware, ...getDefaultMiddleware()],
})

export default store; 