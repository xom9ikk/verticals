const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const numberRoundDecimal = (
  value: number, n: number,
) => Math.round((value + Number.EPSILON) * 10 ** n) / 10 ** n;

export const useFormat = () => {
  const n = (v: number) => (v < 10 ? `0${v}` : v);

  const formatDate = (date: Date) => {
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${day} ${months[month]}, ${n(hours)}:${n(minutes)}`;
  };

  const formatSize = (bytes: number) => {
    const UNITS = ['b', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];
    if (bytes === 0) return '0';
    const exp = Math.floor(Math.log(bytes) / Math.log(1000));
    const size = bytes / 1000 ** exp;
    const short = numberRoundDecimal(size, 2);
    const unit = UNITS[exp];
    return `${short} ${unit}`;
  };

  return {
    formatDate,
    formatSize,
  };
};
