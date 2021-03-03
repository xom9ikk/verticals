import {
  SetStateAction, Dispatch, useEffect, useState,
} from 'react';

export const useEffectState = <T>(value: T): [T, Dispatch<SetStateAction<T>>] => {
  const [stateValue, setStateValue] = useState<T>(value);

  useEffect(() => {
    setStateValue(value);
  }, [value]);

  return [stateValue, setStateValue];
};
