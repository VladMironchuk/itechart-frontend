import { configureStore } from "@reduxjs/toolkit";
import filterSlice, { FilterState } from "./slices/filter";
import modalSlice, { ModalState } from "./slices/modal";
import userSlice, { userState } from "./slices/user";

export type AppProps = userState & ModalState & FilterState;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    modal: modalSlice.reducer,
    filter: filterSlice.reducer,
  },
});

export default store;
