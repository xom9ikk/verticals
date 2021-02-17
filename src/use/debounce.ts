import { useCallback } from 'react';
import debounce from 'lodash.debounce';

export const useDebounce = (
  callback: (...args: any) => void, delay: number,
) => useCallback(debounce(callback, delay), []);
