import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  USER_DATA: [],
  loading: true,
  error: false,
};

export const userDataSlice = createSlice({
  name: "user_data",
  initialState,
  reducers: {
    setuserData: (state, action) => {
      const { user, loading } = action.payload;
      state.USER_DATA = user;
      state.loading = loading;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setuserData } = userDataSlice.actions;

export default userDataSlice.reducer;
