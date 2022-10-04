import { accountMoviment } from "../services/axiosRequests";

export const withdrawManager = async () =>
  await accountMoviment("Withdraw").then((response) => response.withdrawResult);
