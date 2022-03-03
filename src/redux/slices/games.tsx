import { createSlice } from "@reduxjs/toolkit";

export type GamesState = {
  games: {
    gameLogo: string;
    gameTitle: string;
    gamePrice: number;
    gamePlatformsImages: string[];
    gamePlatforms: string[];
    gameDescription: string;
    ageLimit: number;
    rating: number;
    genre: string;
    date: number;
  }[];
};

const initialState: GamesState = {
  games: [],
};

const gamesSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateGames(state, action) {
      const gamesState = state;
      gamesState.games = action.payload.games;
    },
  },
});

export const gamesActions = gamesSlice.actions;
export default gamesSlice;
