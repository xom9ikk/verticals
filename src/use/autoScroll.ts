/* eslint-disable no-param-reassign */
import {
  RefObject, useEffect, useLayoutEffect, useState,
} from 'react';

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
  observeDirectionLimit?: ScrollDirection,
) => {
  const [isLimit, setIsLimit] = useState<any>(true);

  const scrollToTop = () => {
    if (ref.current) {
      ref.current.scrollTop = 0;
    }
  };

  const scrollToBottom = () => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  };

  const scrollToRight = () => {
    if (ref.current) {
      ref.current.scrollLeft = ref.current.scrollWidth;
    }
  };

  const scrollToLeft = () => {
    if (ref.current) {
      ref.current.scrollLeft = 0;
    }
  };

  const handleScroll = () => {
    switch (observeDirectionLimit) {
      case ScrollDirection.Top: {
        setIsLimit(ref.current.scrollTop === 0);
        break;
      }
      case ScrollDirection.Bottom: {
        setIsLimit(ref.current.scrollTop + ref.current.clientHeight === ref.current.scrollHeight);
        break;
      }
      case ScrollDirection.Right: {
        setIsLimit(ref.current.scrollLeft + ref.current.clientWidth === ref.current.scrollWidth);
        break;
      }
      case ScrollDirection.Left: {
        setIsLimit(ref.current.scrollLeft === 0);
        break;
      }
      default: break;
    }
  };

  useLayoutEffect(() => {
    if (observeDirectionLimit !== undefined) {
      ref.current.addEventListener('scroll', handleScroll);
      return () => {
        ref.current.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

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
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, dependencies);

  return {
    scrollToTop,
    scrollToBottom,
    scrollToRight,
    scrollToLeft,
    isLimit,
  };
};
