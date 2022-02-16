import { createSlice } from "@reduxjs/toolkit";

export type CartState = {
  totalAmount: number;
  cartItems: {
    gameLogo: string;
    gameTitle: string;
    gamePrice: number;
    gamePlatformsImg: string[];
    gamePlatforms: string[];
    gameDescription: string;
    ageLimit: number;
    rating: number;
    amount: number;
    orderDate: Date;
  }[];
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
    changeItemAmount(state, action) {
      const cartState = state;
      const { itemTitle, currentItemAmount } = action.payload;
      const gameIndex = cartState.cartItems.findIndex((item) => item.gameTitle === itemTitle);
      cartState.totalAmount = +(
        cartState.totalAmount +
        (currentItemAmount - cartState.cartItems[gameIndex].amount) * cartState.cartItems[gameIndex].gamePrice
      ).toPrecision(4);
      cartState.cartItems[gameIndex].amount = currentItemAmount;
    },
    removeItemsFromCart(state, action) {
      const cartState = state;
      const { itemsToRemove } = action.payload;
      cartState.cartItems = cartState.cartItems.filter((item) => !itemsToRemove.includes(item.gameTitle));
      cartState.totalAmount = cartState.cartItems.reduce((acc, cur) => acc + cur.gamePrice * cur.amount, 0);
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
