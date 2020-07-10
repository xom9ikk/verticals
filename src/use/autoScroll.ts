/* eslint-disable no-param-reassign */
import { RefObject, useEffect } from 'react';

export const useAutoScroll = (ref: RefObject<any>, dependencies: any) => {
  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.scrollBehavior = 'smooth';
    ref.current.scrollTop = ref.current.scrollHeight;
  }, dependencies);
};
