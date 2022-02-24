import { createSlice } from "@reduxjs/toolkit";

export type CartState = {
  totalAmount: number;
  cartItems: {
    gameLogo: string;
    gameTitle: string;
    gamePrice: number;
    gamePlatformsImages: string[];
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
        cartState.totalAmount = +(cartState.totalAmount + item.gamePrice).toFixed(2);
      } else {
        cartState.cartItems[gameIndex].amount++;
        cartState.totalAmount = +(cartState.totalAmount + +cartState.cartItems[gameIndex].gamePrice).toFixed(2);
      }
    },
    changeItemAmount(state, action) {
      const cartState = state;
      const { itemTitle, currentItemAmount } = action.payload;
      const gameIndex = cartState.cartItems.findIndex((item) => item.gameTitle === itemTitle);
      cartState.totalAmount = +(
        cartState.totalAmount +
        (currentItemAmount - cartState.cartItems[gameIndex].amount) * cartState.cartItems[gameIndex].gamePrice
      ).toFixed(2);
      cartState.cartItems[gameIndex].amount = currentItemAmount;
    },
    removeItemsFromCart(state, action) {
      const cartState = state;
      const { itemsToRemove } = action.payload;
      cartState.cartItems = cartState.cartItems.filter((item) => !itemsToRemove.includes(item.gameTitle));
      cartState.totalAmount = +cartState.cartItems.reduce((acc, cur) => acc + cur.gamePrice * cur.amount, 0).toFixed(2);
    },
    submitOrder(state) {
      const cartState = state;
      cartState.totalAmount = 0;
      cartState.cartItems = [];
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
