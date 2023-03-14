import { createSlice, configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import manageCartSlice from "./manageCartSlice";

const store = configureStore({
  reducer: { cart: cartSlice.reducer, add: manageCartSlice.reducer },
});

export default store;
