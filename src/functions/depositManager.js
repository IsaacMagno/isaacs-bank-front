import { accountMoviment } from "../services/axiosRequests";

export const depositManager = async () =>
  await accountMoviment("Deposit").then((response) => response.depositResult);
