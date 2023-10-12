import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', //'checking', 'not-authenticated', 'authenticated'
        _id: null,
        email: null,
        username: null,
        photoURL: null,
        errorMessage: null
    },
    reducers: {
        login: (state, {payload}) => {
            state.status =  'authenticated';
            state._id =  payload._id;
            state.email =  payload.email;
            state.username =  payload.username;
            state.photoURL =  payload.photoURL;
            state.errorMessage =  null;
        },
        logout: (state, { payload }) => {
            state.status =  'not-authenticated';
            state._id =  null;
            state.email =  null;
            state.username =  null;
            state.photoURL =  null;
            state.errorMessage =  payload?.errorMessage;
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        }
    }
});

export const { login, logout, checkingCredentials } = authSlice.actions;