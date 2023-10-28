import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isLiked: false,
};

export const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToWishList: (state, { payload }) => {
      const item = state.products.find((item) => item.id === payload.id);
      isLiked = item.isLiked(!item.isLiked);
    },
  },
});

export const { wishList } = wishListSlice.actions;

export default wishListSlice.reducer;
