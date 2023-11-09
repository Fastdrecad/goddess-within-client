import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );

      if (item) {
        item.quantity += 1;
      } else {
        state.products.push(action.payload);
      }
    },

    removeItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.size !== action.payload.size
      );
    },

    resetCart: (state) => {
      state.products = [];
    },

    increment: (state, action) => {
      const item = state.products.find(
        (item) =>
          item.size === action.payload.size && item.size === action.payload.size
      );
      item.quantity++;
    },

    decrement: (state, action) => {
      const item = state.products.find(
        (item) =>
          item.size === action.payload.size && item.size === action.payload.size
      );
      item.quantity--;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, resetCart, increment, decrement } =
  cartSlice.actions;

export default cartSlice.reducer;
