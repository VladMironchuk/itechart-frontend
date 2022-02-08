import { configureStore } from "@reduxjs/toolkit";
import modalSlice, { ModalState } from "./slices/modal";
import userSlice, { userState } from "./slices/user";

export type AppProps = userState & ModalState;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    modal: modalSlice.reducer,
  },
});

export default store;
