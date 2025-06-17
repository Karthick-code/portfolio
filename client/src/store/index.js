import { configureStore } from '@reduxjs/toolkit';
import projectReducer from '../slices/projectSlice';
import userReducer from '../slices/userSlice';

const store = configureStore({
  reducer: {
    project: projectReducer,
    user:userReducer,
  },
});

export default store;