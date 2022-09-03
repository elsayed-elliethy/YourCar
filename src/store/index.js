import React, { Component } from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";

//////////
const inetialToken = localStorage.getItem("token");
const inetialExpirationTime = localStorage.getItem("expirationTime");
const inetialLogin = inetialToken && inetialExpirationTime ? true : false;
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: inetialToken,
    isloggedIn: inetialLogin,
    expirationTime: inetialExpirationTime,
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.tok;
      state.expirationTime = action.payload.expir;
      state.isloggedIn = true;
    },
    logout(state, action) {
      state.token = "";
      state.expirationTime = "";
      state.isloggedIn = false;
    },
  },
});

////////

/////////

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
export const authActions = authSlice.actions;

export default store;
