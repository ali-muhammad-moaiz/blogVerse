import { createSlice } from "@reduxjs/toolkit";

const initializeState = () => {
    return {
        isLoggedIn : false,
        userData : null
    }
}

const initialState = {
    auth: initializeState()
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.userData =  action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userData =  null;
        }
    }
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;