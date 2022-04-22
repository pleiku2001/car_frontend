import { createSlice } from "@reduxjs/toolkit";

export const cartRedux = createSlice({
  name: "cart",
  initialState: {
    total: 0,
    products: [],
    quantity: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    deleteProduct: (state, action) => {
      let { id, price, quantity } = action.payload;
      state.quantity -= 1;
      state.total -= price * quantity;
      state.products = state.products.filter((e) => id !== e._id);
    },
  },
});

export const { addProduct, deleteProduct } = cartRedux.actions;

export default cartRedux.reducer;
