import { createSlice } from "@reduxjs/toolkit";

export type userState = {
  isLogged: boolean;
  login: string;
};

const initialState = {
  login: "",
  isLogged: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateLogin(state, action) {
      const appState = state;
      appState.login = action.payload.login;
    },
    toggleLogging(state) {
      const appState = state;
      appState.isLogged = !state.isLogged;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
