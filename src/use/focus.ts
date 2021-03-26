import { useEffect } from 'react';

export const useFocus = (ref?: any, dependencies?: Array<boolean>) => {
  const focus = (focusRef: any) => {
    if (!focusRef.current) return;
    focusRef.current.focus();
    focusRef.current.setSelectionRange(focusRef.current.value.length, focusRef.current.value.length);
  };

  useEffect(() => {
    const isValid = dependencies?.some((predicate) => predicate);
    if (isValid) {
      focus(ref);
    }
  }, dependencies);

  return {
    focus,
  };
};
