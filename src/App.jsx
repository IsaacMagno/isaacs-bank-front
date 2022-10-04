import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setWithdrawLogs,
  setDepositLogs,
  setBalance,
  setBillLogs,
  setExpenseLogs,
} from "./Redux/reducers/moneyManager";
import { withdrawManager } from "./functions/withdrawManager";
import { depositManager } from "./functions/depositManager";
import { billManager } from "./functions/billManager";
import { expensesManager } from "./functions/expensesManager";
import Home from "./pages/Home";
import Deposit from "./components/accManComponents/Deposit";

const App = () => {
  const dispatch = useDispatch();

  // Realiza a primeira requisão dos logs no banco de dados.

  useEffect(() => {
    const wLogs = async () =>
      await withdrawManager().then((response) =>
        dispatch(setWithdrawLogs(response))
      );

    const dLogs = async () =>
      await depositManager().then((response) =>
        dispatch(setDepositLogs(response))
      );

    const bLogs = async () =>
      await billManager().then((response) => dispatch(setBillLogs(response)));

    const eLogs = async () =>
      await expensesManager().then((response) =>
        dispatch(setExpenseLogs(response))
      );

    wLogs();
    dLogs();
    bLogs();
    eLogs();
  }, [dispatch]);

  const { depositLogs, withdrawLogs } = useSelector(
    (state) => state.moneyManager
  );

  // Puxa os dados do redux e faz o calculo de quanto dinheiro existe na conta com base nos logs.

  useEffect(() => {
    const balanceCalculator = (deposit, withdraw) => {
      const depositValues = deposit
        .map((d) => d.value)
        .reduce((prev, curr) => prev + curr, 0);
      const withdrawValues = withdraw
        .map((w) => w.value)
        .reduce((prev, curr) => prev + curr, 0);

      return depositValues - withdrawValues;
    };

    dispatch(setBalance(balanceCalculator(depositLogs, withdrawLogs)));
  }, [depositLogs, withdrawLogs, dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/deposits' element={<Deposit />} />
    </Routes>
  );
};

export default App;
