/* eslint-disable max-len,prefer-promise-reject-errors,no-return-assign */
import { useRef } from 'react';

export const useCancellablePromises = () => {
  const pendingPromises = useRef<any[]>([]);

  const appendPendingPromise = (promise: any) => (pendingPromises.current = [...pendingPromises.current, promise]);

  const removePendingPromise = (promise: any) => (pendingPromises.current = pendingPromises.current.filter(
    (p) => p !== promise,
  ));

  const clearPendingPromises = () => pendingPromises.current.map((p) => p.cancel());

  const cancellablePromise = (promise: any) => {
    let isCanceled = false;

    const wrappedPromise = new Promise((resolve, reject) => {
      promise.then(
        (value: any) => (isCanceled ? reject({ isCanceled, value }) : resolve(value)),
        (error: any) => reject({ isCanceled, error }),
      );
    });

    return {
      promise: wrappedPromise,
      cancel: () => (isCanceled = true),
    };
  };

  const delay = (n: number) => new Promise((resolve) => setTimeout(resolve, n));

  return {
    appendPendingPromise,
    removePendingPromise,
    clearPendingPromises,
    cancellablePromise,
    delay,
  };
};
