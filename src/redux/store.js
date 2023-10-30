import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import wishReducer from "./wishReducer";

export const store = configureStore({
  reducer: { cart: cartReducer, wish: wishReducer },
});
