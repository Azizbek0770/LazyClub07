import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../components/auth/authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;