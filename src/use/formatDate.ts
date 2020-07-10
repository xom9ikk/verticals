const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const useFormatDate = () => {
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return `${day} ${months[month]}, ${year}`;
  };
  return {
    formatDate,
  };
};
