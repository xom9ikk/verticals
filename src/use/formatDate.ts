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

export const useFormatDate = () => {
  const n = (v: number) => (v < 10 ? `0${v}` : v);

  const formatDate = (date: Date) => {
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${day} ${months[month]}, ${n(hours)}:${n(minutes)}`;
  };
  return {
    formatDate,
  };
};
