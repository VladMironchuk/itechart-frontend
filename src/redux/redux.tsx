import { createSlice, configureStore } from "@reduxjs/toolkit";

export type AppProps = {
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

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export const userActions = userSlice.actions;
export default store;
