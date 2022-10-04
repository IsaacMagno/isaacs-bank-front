import React from "react";
import Deposit from "../components/accManComponents/Deposit";
import Logs from "../components/accManComponents/Logs";
import Withdraw from "../components/accManComponents/Withdraw";

export const selectComponent = (componentName) => {
  if (componentName === "deposit") return <Deposit />;
  if (componentName === "withdraw") return <Withdraw />;
  if (componentName === "logs") return <Logs />;
};
