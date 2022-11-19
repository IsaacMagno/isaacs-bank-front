import axios from "axios";

export const URL = "http://localhost:8080";
// export const URL = "http://localhost:3001";
// export const URL = "https://isaac-banks-backend.herokuapp.com";

export const accountMoviment = async (type) => {
  return await axios.get(`${URL}/${type}`).then((response) => response.data);
};

export const valuesManager = async (valueData, type) => {
  const { categoria, descricao, valor } = valueData;
  return await axios
    .post(`${URL}/${type}`, { categoria, descricao, valor })
    .then((response) => response.data);
};

export const createBill = async (data) => {
  const { nome, valorTotal, numeroParcelas } = data;

  console.log(nome, valorTotal, numeroParcelas);
  return await axios
    .post(`${URL}/bill`, { nome, valorTotal, numeroParcelas })
    .then((response) => response.data);
};

export const updateBill = async (valorPago, id) => {
  return await axios
    .patch(`${URL}/bill/${id}`, { valorPago })
    .then((response) => response.data);
};

export const createExpense = async (data) => {
  const { categoria, nome, descricao, valor } = data;
  return await axios
    .post(`${URL}/expense`, {
      categoria,
      nome,
      descricao,
      valor,
    })
    .then((response) => response.data);
};

export const deleteExpense = async (id) => {
  return await axios.delete(`${URL}/expenses/${id}`);
};

export const accountData = async () => {
  return await axios.get(`${URL}/account/1`).then((response) => response.data);
};
