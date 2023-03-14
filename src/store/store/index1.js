import React, { Component } from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const showCartSlice = createSlice({
  name: "showCart",
  initialState: { show: false },
  reducers: {
    openCart(state, action) {
      state.show = true;
    },
    closeCart(state, action) {
      state.show = false;
    },
  },
});
const manageCartSlice = createSlice({
  name: "manageCart",
  initialState: { items: [], totalPrice: 0, totalAmount: 0 },
  reducers: {
    addMeal(state, action) {
      const newItem = action.payload.val;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalAmount = state.totalAmount + 1;
      let updatedArray;
      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: +existingItem.quantity + 1,
        };
        state.items[state.items.indexOf(existingItem)] = updatedItem;
        updatedArray = [...state.items];
        state.items = updatedArray;
      } else {
        state.items = [...state.items, newItem];
      }
    },
    removeMeal(state, action) {
      const newItem = action.payload.val;
      state.totalAmount = state.totalAmount - 1;
      let updatedArray;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      const updatedItem = {
        ...existingItem,
        quantity: +existingItem.quantity - 1,
      };
      state.items[state.items.indexOf(existingItem)] = updatedItem;
      if (updatedItem.quantity === 0) {
        updatedArray = state.items.filter((ele) => {
          return ele.id !== updatedItem.id;
        });
      } else {
        updatedArray = [...state.items];
      }

      state.items = updatedArray;
    },
    clearCartItems(state, action) {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

const store = configureStore({
  reducer: {
    showCart: showCartSlice.reducer,
    manageCart: manageCartSlice.reducer,
  },
});
export const showCartActions = showCartSlice.actions;
export const manageCartActions = manageCartSlice.actions;
export default store;
