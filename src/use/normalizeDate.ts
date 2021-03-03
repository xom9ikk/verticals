/* eslint-disable no-param-reassign */
import subMinutes from 'date-fns/subMinutes';
import addMinutes from 'date-fns/addMinutes';

export const useNormalizeDate = () => {
  const normalizeDate = (date: Date | number | null) => {
    if (date == null) {
      return null;
    }
    if (typeof date === 'number') {
      date = new Date(date);
    }
    const offset = date.getTimezoneOffset();
    const sign = Math.sign(offset);
    const calculateDateWithOffset = sign === -1 ? subMinutes : addMinutes;
    return calculateDateWithOffset(date, offset);
  };

  return {
    normalizeDate,
  };
};
