import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLiked: false,
};

export const wishSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    likedItems: (state, action) => {
      let currentLikedItems = likedItems;
      if (!isLiked) {
        state.isLiked = true;
        if (currentLikedItems.includes(id))
          state.likedItems.push([...currentLikedItems], action.payload.id);
      } else {
        state.isLiked = false;
        if (currentLikedItems.includes(id))
          state.likedItems(
            currentLikedItems.filter((item) => item !== action.payload.id)
          );
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { likedItems } = wishSlice.actions;

export default wishSlice.reducer;
