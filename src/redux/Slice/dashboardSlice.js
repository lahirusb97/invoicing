import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  MONTH_INCOME: {},
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
      // state.Month_INCOME = Object.entries(incomeData.day_income).map(
      //   ([date, { Count }]) => ({
      //     date,
      //     amount,
      //   })
      // );
      state.loading = loading;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSalesData } = dashboardSlice.actions;

export default dashboardSlice.reducer;
