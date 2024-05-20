import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'

const DataStore = configureStore({
    reducer: authReducer
})

export default DataStore;