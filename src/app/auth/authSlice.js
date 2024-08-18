"use client"

// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Initially, no user is logged in
  isAuthenticated: false,
  savedSession: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.savedSession = true;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.savedSession = false;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;