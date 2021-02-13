import { BaseSyntheticEvent, useEffect } from 'react';

type IUseEventListener = (
  event: string,
  callback: (e: BaseSyntheticEvent | KeyboardEvent) => void,
  keyCode?: string,
) => void;

export const useEventListener: IUseEventListener = (
  event, callback, keyCode,
) => {
  useEffect(() => {
    const handleEvent = (e: KeyboardEvent) => {
      if (keyCode) {
        if (e.code === keyCode) {
          callback(e);
        }
      } else {
        callback(e);
      }
    };

    // @ts-ignore
    document.addEventListener(event, handleEvent);

    // @ts-ignore
    return () => document.removeEventListener(event, handleEvent);
  }, []);
};
