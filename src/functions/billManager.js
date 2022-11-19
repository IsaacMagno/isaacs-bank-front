import { accountMoviment } from "../services/axiosRequests";

export const billManager = async () =>
  await accountMoviment("bill").then((response) => response);
