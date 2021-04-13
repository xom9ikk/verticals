import React from 'react';

import { useCancellablePromises } from './cancellablePromise';

export const useClickPreventionOnDoubleClick = (
  onClick: (event: React.SyntheticEvent) => void,
  onDoubleClick: (event: React.SyntheticEvent) => void,
  isStopPropagation?: boolean,
) => {
  const {
    appendPendingPromise,
    clearPendingPromises,
    removePendingPromise,
    cancellablePromise,
    delay,
  } = useCancellablePromises();

  const handleClick = (event: React.SyntheticEvent) => {
    if (isStopPropagation) {
      event.stopPropagation();
    }
    clearPendingPromises();
    const waitForClick = cancellablePromise(delay(200));
    appendPendingPromise(waitForClick);

    return waitForClick.promise
      .then(() => {
        removePendingPromise(waitForClick);
        onClick?.(event);
      })
      .catch((errorInfo: any) => {
        removePendingPromise(waitForClick);
        if (!errorInfo.isCanceled) {
          throw errorInfo.error;
        }
      });
  };

  const handleDoubleClick = (event: React.SyntheticEvent) => {
    if (isStopPropagation) {
      event.stopPropagation();
    }
    clearPendingPromises();
    onDoubleClick?.(event);
  };

  return { handleClick, handleDoubleClick };
};
