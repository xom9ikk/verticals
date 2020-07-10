/* eslint-disable no-param-reassign */
import { RefObject, useEffect } from 'react';

export const useAutoScroll = (ref: RefObject<any>, dependencies: any) => {
  const scrollToBottom = () => {
    if (!ref.current) return;
    ref.current.style.scrollBehavior = 'smooth';
    ref.current.scrollTop = ref.current.scrollHeight;
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollToBottom();
    }, 0);
    return () => {
      clearTimeout(timeout);
    };
  }, dependencies);

  return {
    scrollToBottom,
  };
};
