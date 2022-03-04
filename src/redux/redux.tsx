import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filter";
import modalSlice from "./slices/modal";
import userSlice from "./slices/user";
import cartSlice from "./slices/cart";
import gamesSlice from "./slices/games";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    modal: modalSlice.reducer,
    cart: cartSlice.reducer,
    filter: filterSlice.reducer,
    products: gamesSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
