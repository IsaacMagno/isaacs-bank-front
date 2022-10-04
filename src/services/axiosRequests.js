import axios from "axios";

// export const URL = "http://localhost:3001";
export const URL = "https://isaac-banks-backend.herokuapp.com";

export const accountMoviment = async (type) => {
  return await axios
    .get(`${URL}/${type}List`)
    .then((response) => response.data);
};

export const valuesManager = async (valueData, type) => {
  return await axios
    .post(`${URL}/${type}`, { valueData })
    .then((response) => response.data);
};

export const updateBill = async (key, value, id) => {
  return await axios
    .put(`${URL}/bill/${id}`, { [key]: value })
    .then((response) => response.data);
};

export const deleteExpense = async (id) => {
  return await axios.delete(`${URL}/expenses/${id}`);
};
