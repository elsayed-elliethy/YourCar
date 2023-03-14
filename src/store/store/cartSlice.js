import { createSlice } from "@reduxjs/toolkit";
import useHttp from "../hooks/use-http";

const cartSlice = createSlice({
  name: "show",
  initialState: { show: false },
  reducers: {
    toggleCart(state, action) {
      state.show = !state.show;
    },
  },
});

export const showCartActions = cartSlice.actions;
export default cartSlice;
