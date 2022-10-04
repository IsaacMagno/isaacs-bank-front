import { accountMoviment } from "../services/axiosRequests";

export const expensesManager = async () =>
  await accountMoviment("futureExpense").then(
    (response) => response.expensesResult
  );
