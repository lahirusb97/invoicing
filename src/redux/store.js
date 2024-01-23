import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./Slice/userDataSlice";
import productDataSlice from "./Slice/productDataSlice";
import shopDataSlice from "./Slice/shopDataSlice";
import SnackBarSlice from "./Slice/SnackBarSlice";
import editDialog from "./Slice/editOpenSlice";
import invoiceSlice from "./Slice/invoiceSlice";
import dashboardSlice from "./Slice/dashboardSlice";
import invoiceEditSlice from "./Slice/invoice/invoiceEditSlice";

export const store = configureStore({
  reducer: {
    user_data: userDataSlice,
    product_data: productDataSlice,
    shop_data: shopDataSlice,
    snack_bar: SnackBarSlice,
    edit_open: editDialog,
    dashboard_data: dashboardSlice,
    invoice_data: invoiceSlice,
    invoice_edit_open: invoiceEditSlice,
  },
});
