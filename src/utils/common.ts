export const numberWithCommas = (x: number) => {
  const value = x * 10 ** 3;
  return value
    .toString()
    .concat('₫')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
