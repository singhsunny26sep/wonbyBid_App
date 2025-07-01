// store.js
import { configureStore } from '@reduxjs/toolkit';
import socketDataReducer from './userSlice';

export const store = configureStore({
  reducer: {
    socketData: socketDataReducer,
  },
});
