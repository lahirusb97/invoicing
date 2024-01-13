import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  PRODUCT_DATA: [],
  loading: true,
  error: false,
};

export const productDataSlice = createSlice({
  name: "product_data",
  initialState,
  reducers: {
    setProductData: (state, action) => {
      const { product, loading } = action.payload;
      state.PRODUCT_DATA = product;
      state.loading = loading;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProductData } = productDataSlice.actions;

export default productDataSlice.reducer;
