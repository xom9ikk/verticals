import { SyntheticEvent } from 'react';
import { useCancellablePromises } from './cancellablePromise';

export const useClickPreventionOnDoubleClick = (
  onClick: (event: SyntheticEvent) => void,
  onDoubleClick: (event: SyntheticEvent) => void,
  isStopPropagation?: boolean,
) => {
  const {
    appendPendingPromise,
    clearPendingPromises,
    removePendingPromise,
    cancellablePromise,
    delay,
  } = useCancellablePromises();

  const handleClick = (event: SyntheticEvent) => {
    if (isStopPropagation) {
      console.log('====stop propagation');
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

  const handleDoubleClick = (event: SyntheticEvent) => {
    if (isStopPropagation) {
      event.stopPropagation();
    }
    clearPendingPromises();
    onDoubleClick?.(event);
  };

  return { handleClick, handleDoubleClick };
};
