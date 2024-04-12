import dayjs from 'dayjs';

export const generateTime = () => {
  return dayjs(new Date()).format('DD/MM/YYYY HH:mm:ss');
};
