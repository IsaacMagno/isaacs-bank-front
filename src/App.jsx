import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { accountData } from "./services/axiosRequests";
import { setAccount } from "./Redux/reducers/moneyManager";
import Home from "./pages/Home";
import Deposit from "./components/accManComponents/Deposit";

const App = () => {
  const dispatch = useDispatch();

  // Realiza a primeira requisão dos logs no banco de dados.

  useEffect(() => {
    const accData = async () =>
      await accountData().then((response) => dispatch(setAccount(response)));

    accData();
  }, [dispatch]);

  // Puxa os dados do redux e faz o calculo de quanto dinheiro existe na conta com base nos logs.

  // useEffect(() => {
  //   const balanceCalculator = (deposit, withdraw) => {
  //     const depositValues = deposit
  //       .map((d) => d.value)
  //       .reduce((prev, curr) => prev + curr, 0);
  //     const withdrawValues = withdraw
  //       .map((w) => w.value)
  //       .reduce((prev, curr) => prev + curr, 0);

  //     return depositValues - withdrawValues;
  //   };

  //   dispatch(setBalance(balanceCalculator(depositLogs, withdrawLogs)));
  // }, [depositLogs, withdrawLogs, dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/deposits' element={<Deposit />} />
    </Routes>
  );
};

export default App;
