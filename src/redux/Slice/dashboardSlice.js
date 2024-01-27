import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  MONTH_INCOME: {}, //current moth DATA ROOT DATA FOR BILING
  DASHBOARD_DATA: {},
  loading: true,
  error: false,
};

export const dashboardSlice = createSlice({
  name: "dashboard_data",
  initialState,
  reducers: {
    setSalesData: (state, action) => {
      const { incomeData, loading } = action.payload;

      state.MONTH_INCOME = incomeData;
      state.loading = loading;
    },
    dashboardData: (state, action) => {
      const { dashboardData } = action.payload;
      state.DASHBOARD_DATA = dashboardData;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSalesData, dashboardData } = dashboardSlice.actions;

export default dashboardSlice.reducer;
