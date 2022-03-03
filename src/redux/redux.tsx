import { configureStore } from "@reduxjs/toolkit";
import filterSlice, { FilterState } from "./slices/filter";
import modalSlice, { ModalState } from "./slices/modal";
import userSlice, { userState } from "./slices/user";
import cartSlice, { CartState } from "./slices/cart";
import gamesSlice, { GamesState } from "./slices/games";

export type AppProps = userState & ModalState & FilterState & CartState & GamesState;

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
