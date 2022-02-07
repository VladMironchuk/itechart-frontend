import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/modal";
import userSlice from "./slices/user";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    modal: modalSlice.reducer,
  },
});

export default store;
