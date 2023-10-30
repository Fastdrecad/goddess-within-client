import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
};

export const wishSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    like: (state, action) => {
      const item = state.product.find((item) => item.id === action.payload.id);
      if (item) {
        item.isLiked = !item.isLiked;
      } else {
        state.product.push(action.payload);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { like } = wishSlice.actions;

export default wishSlice.reducer;
