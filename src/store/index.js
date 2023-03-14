import { configureStore, createSlice } from "@reduxjs/toolkit";
const manageFavoritesSlice = createSlice({
  name: "manageFavorites",
  initialState: {
    items: [],
    totalAmount: 0,
  },
  reducers: {
    replaceFavorites(state,action){
      state.totalAmount = action.payload.totalAmount
      state.items = action.payload.items
    },
    manageFavorites(state, action) {
      const newItem = action.payload;
      const existingItem = [...state.items].find((item) => item.id === newItem.id);
      let updatedArray;
      if (existingItem) {
        updatedArray = [...state.items].filter(item=>item !== existingItem)
        state.items = updatedArray;
        state.totalAmount = +state.totalAmount - 1;
      } else {
        state.items = [...state.items, newItem];
        state.totalAmount = +state.totalAmount + 1;
      }
    },
    
  },
});

// ////////
// const currentUser = JSON.parse(localStorage.getItem("currentUser"));
// export const sendFavoritesData = (favorites)=>{
//   return async(dispatch) => {
//     dispatch()

//     const sendRequest = async ()=>{
//     const response =  await fetch(`https://cars-3a440-default-rtdb.firebaseio.com/users/${currentUser.id}/favorites.json`,{
//        method: "PUT",
//        body: JSON.stringify(favorites),
//      headers: {
//        "Content-Type": "application/json",
//      },
//      })
//      return response
//     }
//     await sendRequest()
//   }
// }
// ///////
const store = configureStore({
  reducer: {
    manageFavorites: manageFavoritesSlice.reducer,
  },
});
export const favoritesActions = manageFavoritesSlice.actions;
export default store;