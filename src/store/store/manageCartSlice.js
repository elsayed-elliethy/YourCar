import { createSlice } from "@reduxjs/toolkit";

const manageCartSlice = createSlice({
  name: "Add",
  initialState: { items: [], TotalQuantity: 0, changed: false },
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.TotalQuantity = action.payload.totalQuantity;
    },
    addItem(state, action) {
      const newItem = { ...action.payload.value, quantity: 1 };
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.TotalQuantity = state.TotalQuantity + 1;
      state.changed = true;
      if (existingItem) {
        const upatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        state.items[state.items.indexOf(existingItem)] = upatedItem;
        const updateItems = state.items;
        state.items = updateItems;
      } else {
        // state.items = [...state.items, newItem];
        state.items.push(newItem);
      }
    },
    removeItem(state, action) {
      const removeItem = { ...action.payload.value };
      const existingItem = state.items.find(
        (item) => item.id === removeItem.id
      );
      state.TotalQuantity = state.TotalQuantity - 1;
      state.changed = true;
      const upatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      state.items[state.items.indexOf(existingItem)] = upatedItem;
      let updateItems;
      if (existingItem.quantity === 1) {
        updateItems = state.items.filter((ele) => {
          return ele.id !== existingItem.id;
        });
      } else {
        updateItems = state.items;
      }
      state.items = updateItems;
    },
  },
});

export const manageCartActions = manageCartSlice.actions;
export default manageCartSlice;
