import { configureStore } from "@reduxjs/toolkit";
import modalSlice, { ModalState } from "./slices/modal";
import userSlice, { userState } from "./slices/user";
import cartSlice, { CartState } from "./slices/cart";

export type AppProps = userState & ModalState & CartState;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    modal: modalSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
