import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  OPEN: false,
  ITEM: [],
};

export const editOpenSlice = createSlice({
  name: "edit_open",
  initialState,
  reducers: {
    setItemData: (state, action) => {
      state.ITEM = action.payload;
    },
    editDialog: (state, action) => {
      state.OPEN = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setItemData, editDialog } = editOpenSlice.actions;

export default editOpenSlice.reducer;
