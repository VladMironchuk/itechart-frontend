import { createSlice } from "@reduxjs/toolkit";

export type userState = {
  isLogged: boolean;
  login: string;
  username: string;
  description: string;
  userBalance: number;
  userIsAdmin: boolean;
};

const initialState = {
  login: "",
  username: "",
  description: "",
  isLogged: false,
  userBalance: 100,
  userIsAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateLogin(state, action) {
      const appState = state;
      appState.login = action.payload.login;
      appState.userIsAdmin = action.payload.login.includes("admin");
    },
    toggleLogging(state) {
      const appState = state;
      appState.isLogged = !state.isLogged;
    },
    updateUsername(state, action) {
      const appState = state;
      appState.username = action.payload.username;
    },
    updateDescription(state, action) {
      const appState = state;
      appState.description = action.payload.description;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
