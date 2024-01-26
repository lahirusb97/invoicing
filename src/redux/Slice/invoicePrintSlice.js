import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  OPEN: false,
  DATA: {},
};

export const invoicePrintSlice = createSlice({
  name: "invoice_print",
  initialState,
  reducers: {
    openPrintDialog: (state, action) => {
      const { open, data } = action.payload;
      state.OPEN = open;
      state.DATA = data;
    },
    closePrintDialog: (state) => {
      state.OPEN = false;
      state.DATA = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { openPrintDialog, closePrintDialog } = invoicePrintSlice.actions;

export default invoicePrintSlice.reducer;
