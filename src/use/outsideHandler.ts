import { useEffect } from 'react';

export const useOutsideHandler = (ref: any, handler: () => void) => {
  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      handler();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};
