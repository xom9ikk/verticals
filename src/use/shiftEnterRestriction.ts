import { KeyboardEvent } from 'react';

export const useShiftEnterRestriction = () => {
  const shiftEnterRestriction = (event: KeyboardEvent) => {
    const { key, shiftKey } = event;
    if (key === 'Enter' && !shiftKey) {
      console.log('==========shiftEnterRestriction');
      event.preventDefault();
    }
  };

  return {
    shiftEnterRestriction,
  };
};
