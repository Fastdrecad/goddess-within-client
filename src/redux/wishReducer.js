import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const wishSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    like: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.isLiked = !item.isLiked;
      } else {
        state.items.push(item);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { like } = wishSlice.actions;

export default wishSlice.reducer;
