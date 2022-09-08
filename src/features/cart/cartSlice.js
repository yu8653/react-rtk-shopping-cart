import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { checkout } from "../../app/api";

const initialState = {
  items: {},
  checkoutState: "READY",
  errorMessage: "",
};

export const chectoutCart = createAsyncThunk(
  "cart/checkout",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const items = state.cart.items;
    const response = await checkout(items);
    return response;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      const id = action.payload;
      state.items[id] = (state.items[id] || 0) + 1;
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      delete state.items[id];
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      state.items[id] = quantity;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(chectoutCart.pending, (state) => {
      state.checkoutState = "LOADING";
    });
    builder.addCase(chectoutCart.fulfilled, (state, action) => {
      const success = action.payload;
      if (success) {
        state.checkoutState = "READY";
        state.items = {};
      } else {
        state.checkoutState = "ERROR";
      }
    });
    builder.addCase(chectoutCart.rejected, (state, action) => {
      state.checkoutState = "ERROR";
      state.errorMessage = action.error.message || "";
    });
  },
});

export const { addtoCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;

export const getNumItems = createSelector(
  (state) => state.cart.items,
  (items) => {
    return Object.values(items).reduce((a, b) => a + b, 0);
  }
);

export const getTotalPrice = createSelector(
  (state) => state.cart.items,
  (state) => state.products.products,
  (items, products) => {
    let totalprice = Object.entries(items).reduce((total, [id, quantity]) => {
      return (total += products[id].price * quantity);
    }, 0);

    return totalprice.toFixed(2);
  }
);
