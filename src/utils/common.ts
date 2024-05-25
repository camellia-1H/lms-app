export const numberWithCommas = (x: number) => {
  const value = x * 10 ** 4;
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
