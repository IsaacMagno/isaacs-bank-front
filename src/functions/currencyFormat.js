export const currencyFormat = (numberString) => {
  let number = parseFloat(numberString);
  return number.toLocaleString("pt-BR");
};
