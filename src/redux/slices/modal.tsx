import { createSlice } from "@reduxjs/toolkit";

export type ModalState = {
  isSignInVisible: boolean;
  isSignUpVisible: boolean;
};

const initialState = {
  isSignInVisible: false,
  isSignUpVisible: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleSignIn(state) {
      const modalState = state;
      modalState.isSignInVisible = !state.isSignInVisible;
    },
    toggleSignUp(state) {
      const modalState = state;
      modalState.isSignUpVisible = !state.isSignUpVisible;
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice;
