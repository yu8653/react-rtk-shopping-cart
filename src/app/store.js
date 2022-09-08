import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/product/productSlice";
import cartReducer from "../features/cart/cartSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

export default store;
