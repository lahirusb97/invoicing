import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  OPEN: false,
  ITEM: {},
};

export const invoiceEditSlice = createSlice({
  name: "invoice_edit_open",
  initialState,
  reducers: {
    setInvoiceData: (state, action) => {
      state.ITEM = action.payload;
      console.log(action.payload);
    },
    openCloseInvoiceEdit: (state, action) => {
      state.OPEN = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openCloseInvoiceEdit, setInvoiceData } =
  invoiceEditSlice.actions;

export default invoiceEditSlice.reducer;
