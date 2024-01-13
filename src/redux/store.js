import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./Slice/userDataSlice";
import productDataSlice from "./Slice/productDataSlice";
import shopDataSlice from "./Slice/shopDataSlice";
import SnackBarSlice from "./Slice/SnackBarSlice";

export const store = configureStore({
  reducer: {
    user_data: userDataSlice,
    product_data: productDataSlice,
    shop_data: shopDataSlice,
    snack_bar: SnackBarSlice,
  },
});
