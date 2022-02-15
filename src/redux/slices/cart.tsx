import { createSlice } from "@reduxjs/toolkit";
import { Props as GameCardContent } from "@/elements/gameCard/gameCard";

export type CartState = {
  totalAmount: number;
  cartItems: (GameCardContent & { amount: number; orderDate: Date })[];
};

const initialState: CartState = {
  totalAmount: 0,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const cartState = state;
      const { item } = action.payload;
      const gameIndex = cartState.cartItems.findIndex((game) => game.gameTitle === item.gameTitle);
      if (gameIndex === -1) {
        cartState.cartItems.push({ ...item, amount: 1, orderDate: new Date(Date.now()) });
        cartState.totalAmount += item.gamePrice;
      } else {
        cartState.cartItems[gameIndex].amount++;
        cartState.totalAmount += cartState.cartItems[gameIndex].gamePrice;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
