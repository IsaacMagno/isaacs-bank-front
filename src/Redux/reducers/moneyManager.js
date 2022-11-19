import { createSlice } from "@reduxjs/toolkit";

export const moneyManager = createSlice({
  name: "Manager",
  initialState: {
    account: [],
  },
  reducers: {
    setAccount(state, { payload }) {
      return { ...state, account: payload };
    },
  },
});

export const { setAccount } = moneyManager.actions;

export default moneyManager.reducer;
