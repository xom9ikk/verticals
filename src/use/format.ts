/* eslint-disable max-len */
const numberRoundDecimal = (
  value: number, n: number,
) => Math.round((value + Number.EPSILON) * 10 ** n) / 10 ** n;

export const useFormat = () => {
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
    formatSize,
  };
};
