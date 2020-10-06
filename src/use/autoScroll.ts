/* eslint-disable no-param-reassign */
import { RefObject, useEffect } from 'react';

export enum ScrollDirection {
  Top,
  Bottom,
  Right,
  Left,
}

export const useAutoScroll = (
  ref: RefObject<any>,
  scrollDirection?: ScrollDirection,
  dependencies?: Array<any>,
) => {
  const scrollToTop = () => {
    ref.current.scrollTop = 0;
  };

  const scrollToBottom = () => {
    ref.current.scrollTop = ref.current.scrollHeight;
  };

  const scrollToRight = () => {
    ref.current.scrollLeft = ref.current.scrollWidth;
  };

  const scrollToLeft = () => {
    ref.current.scrollLeft = 0;
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!ref.current) return;
      ref.current.style.scrollBehavior = 'smooth';
      switch (scrollDirection) {
        case ScrollDirection.Top: {
          scrollToTop();
          break;
        }
        case ScrollDirection.Bottom: {
          scrollToBottom();
          break;
        }
        case ScrollDirection.Right: {
          scrollToRight();
          break;
        }
        case ScrollDirection.Left: {
          scrollToLeft();
          break;
        }
        default: break;
      }
    }, 0);
    return () => {
      clearTimeout(timeout);
    };
  }, dependencies);

  return {
    scrollToTop,
    scrollToBottom,
    scrollToRight,
    scrollToLeft,
  };
};
