import { useCancellablePromises } from './cancellablePromise';

export const useClickPreventionOnDoubleClick = (
  onClick: () => void,
  onDoubleClick: () => void,
) => {
  const {
    appendPendingPromise,
    clearPendingPromises,
    removePendingPromise,
    cancellablePromise,
    delay,
  } = useCancellablePromises();

  const handleClick = () => {
    clearPendingPromises();
    const waitForClick = cancellablePromise(delay(200));
    appendPendingPromise(waitForClick);

    return waitForClick.promise
      .then(() => {
        removePendingPromise(waitForClick);
        onClick?.();
      })
      .catch((errorInfo: any) => {
        removePendingPromise(waitForClick);
        if (!errorInfo.isCanceled) {
          throw errorInfo.error;
        }
      });
  };

  const handleDoubleClick = () => {
    clearPendingPromises();
    onDoubleClick?.();
  };

  return { handleClick, handleDoubleClick };
};
