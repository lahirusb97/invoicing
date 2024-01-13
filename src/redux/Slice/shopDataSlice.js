import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SHOP_DATA: [],
  loading: true,
  error: false,
};

export const shopDataSlice = createSlice({
  name: "shop_data",
  initialState,
  reducers: {
    setShopData: (state, action) => {
      const { shopdata, loading } = action.payload;
      state.SHOP_DATA = shopdata;
      state.loading = loading;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setShopData } = shopDataSlice.actions;

export default shopDataSlice.reducer;
