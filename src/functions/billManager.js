import { accountMoviment } from "../services/axiosRequests";

export const billManager = async () =>
  await accountMoviment("Bill").then((response) => response.billResult);
