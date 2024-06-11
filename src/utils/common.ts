export const numberWithCommas = (x: number) => {
  const value = x * 10 ** 3;
  return value
    .toString()
    .concat('₫')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const parseSecondToTime = (second: number) => {
  const hour: number = Math.floor(second / 3600);
  const min: number = Math.floor((second % 3600) / 60);
  const secondRemain: number = second % 60;
  let result: string = '';
  if (hour > 0) {
    result += `${hour}h `;
  }
  if (min > 0) {
    result += `${min}m `;
  }
  if (!result) {
    result += `${secondRemain}s `;
  }
  return result.trim();
};
