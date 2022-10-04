import { createSlice } from "@reduxjs/toolkit";

export const moneyManager = createSlice({
  name: "Manager",
  initialState: {
    balance: 0,
    withdrawLogs: [],
    depositLogs: [],
    billLogs: [],
    expenseLogs: [],
  },
  reducers: {
    setBalance(state, { payload }) {
      return { ...state, balance: payload };
    },
    setWithdrawLogs(state, { payload }) {
      return { ...state, withdrawLogs: payload };
    },
    setDepositLogs(state, { payload }) {
      return { ...state, depositLogs: payload };
    },
    setBillLogs(state, { payload }) {
      return { ...state, billLogs: payload };
    },
    setExpenseLogs(state, { payload }) {
      return { ...state, expenseLogs: payload };
    },
  },
});

export const {
  setBalance,
  setWithdrawLogs,
  setDepositLogs,
  setBillLogs,
  setExpenseLogs,
} = moneyManager.actions;

export default moneyManager.reducer;
