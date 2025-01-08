import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import employerReducer from './employerSlice'
export const store = configureStore({
    reducer: {
        user: userReducer,
        employer: employerReducer
    }
})