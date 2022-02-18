import { createSlice } from "@reduxjs/toolkit";

export type ProductsState = {
  games: {
    gameLogo: string;
    gameTitle: string;
    gamePrice: number;
    gamePlatformsImg: string[];
    gamePlatforms: string[];
    gameDescription: string;
    ageLimit: number;
    rating: number;
    genre: string;
  }[];
};

const initialState: ProductsState = {
  games: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts(state, action) {
      const productsState = state;
      productsState.games = action.payload.games;
    },
  },
});
