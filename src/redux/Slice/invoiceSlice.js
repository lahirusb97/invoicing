import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  INVOICE_ITEM: [],
  GRAND_TOTAL: 0,
  GRAND_TOTAL_COST: 0,

  error: false,
};

export const invoiceSlice = createSlice({
  name: "invoice_data",
  initialState,
  reducers: {
    addInvoiceItem: (state, action) => {
      const existingItemIndex = state.INVOICE_ITEM.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex === -1) {
        state.INVOICE_ITEM.push(action.payload);
      } else {
        state.INVOICE_ITEM[existingItemIndex].qty += action.payload.qty;
      }
      state.GRAND_TOTAL_COST += action.payload.cost;
      state.GRAND_TOTAL += action.payload.price;
    },
    addQty: (state, action) => {
      state.INVOICE_ITEM[action.payload].qty++;
      state.GRAND_TOTAL_COST += state.INVOICE_ITEM[action.payload].cost;
      state.GRAND_TOTAL += state.INVOICE_ITEM[action.payload].price;
    },
    minusQty: (state, action) => {
      state.INVOICE_ITEM[action.payload].qty--;
      state.GRAND_TOTAL -= state.INVOICE_ITEM[action.payload].price;
      state.GRAND_TOTAL_COST -= state.INVOICE_ITEM[action.payload].cost;
    },
    removeItem: (state, action) => {
      const removedItem = state.INVOICE_ITEM[action.payload];
      if (removedItem) {
        state.GRAND_TOTAL -= removedItem.price * removedItem.qty;
        state.GRAND_TOTAL_COST -= removedItem.cost * removedItem.qty;
        state.INVOICE_ITEM.splice(action.payload, 1);
      }
    },
    resetInvoice: (state, action) => {
      state.INVOICE_ITEM = [];
      state.GRAND_TOTAL_COST = 0;
      state.GRAND_TOTAL = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addInvoiceItem, addQty, minusQty, removeItem, resetInvoice } =
  invoiceSlice.actions;

export default invoiceSlice.reducer;
