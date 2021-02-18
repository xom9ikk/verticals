import { useCallback } from 'react';
import debounce from 'lodash.debounce';

export const useDebounce = (
  callback: (...args: any) => void,
  delay: number,
  deps: Array<any> = [],
) => useCallback(debounce(callback, delay), deps);
