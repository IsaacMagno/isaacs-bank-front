import { configureStore } from "@reduxjs/toolkit";
import ManagerReducer from "../reducers/moneyManager";

export default configureStore({
  reducer: {
    moneyManager: ManagerReducer,
  },
});
