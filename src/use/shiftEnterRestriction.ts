import { KeyboardEvent } from 'react';

export const useShiftEnterRestriction = () => {
  const shiftEnterRestriction = (event: KeyboardEvent) => {
    const { key, shiftKey } = event;
    if (key === 'Enter' && !shiftKey) {
      event.preventDefault();
    }
  };

  return {
    shiftEnterRestriction,
  };
};
