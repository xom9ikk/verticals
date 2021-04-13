import debounce from 'lodash.debounce';
import { useCallback } from 'react';

export const useDebounce = (
  callback: (...args: any) => void,
  delay: number,
  deps: Array<any> = [],
) => useCallback(debounce(callback, delay), deps);
