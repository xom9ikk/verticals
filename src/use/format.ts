/* eslint-disable max-len */
const months = [
  'Jan', 'Feb', 'Mar',
  'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep',
  'Oct', 'Nov', 'Dec',
];

const normalizeNumber = (v: number) => (v < 10 ? `0${v}` : v);

const numberRoundDecimal = (
  value: number, n: number,
) => Math.round((value + Number.EPSILON) * 10 ** n) / 10 ** n;

export const useFormat = () => {
  const formatDate = (date: Date) => {
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${day} ${months[month]}, ${normalizeNumber(hours)}:${normalizeNumber(minutes)}`;
  };

  /** * Thanks for the implementation Timur Shemsedinov
      * Source code: https://github.com/HowProgrammingWorks/NodejsStarterKit/blob/23168f11bd7d8b4433f4c903b634064043b70e94/application/lib/utils/bytesToSize.js
      * Author: https://github.com/tshemsedinov
   ** */
  const formatSize = (bytes: number) => {
    const UNITS = ['b', 'kb', 'mb', 'gb'];
    if (bytes === 0) return '0';
    const exp = Math.floor(Math.log(bytes) / Math.log(1000));
    const size = bytes / 1000 ** exp;
    const short = numberRoundDecimal(size, 2);
    const unit = UNITS[exp];
    return `${short}${unit}`;
  };

  return {
    formatDate,
    formatSize,
  };
};
