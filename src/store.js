import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './features/appointmentSlice';

const store = configureStore({
  reducer: {
    booking: bookingReducer,
  },
});

export default store;