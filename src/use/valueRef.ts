import { useEffect, useRef } from 'react';

export const useValueRef = (value: any) => {
  const ref = useRef<any>(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
};
