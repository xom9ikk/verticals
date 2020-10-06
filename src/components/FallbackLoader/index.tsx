import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import { Loader } from '@comp/Loader';

interface IFallbackLoader {
  backgroundColor?: string;
  isLoading?: boolean;
  isFixed?: boolean;
  isAbsolute?: boolean;
  size?: 'small' | 'medium' | 'large';
  delay?: number;
  minimumZIndex?: number;
}

export const FallbackLoader: FC<IFallbackLoader> = ({
  backgroundColor,
  isLoading: initialIsLoading = true,
  isFixed,
  isAbsolute,
  size = 'large',
  delay = 500,
  minimumZIndex = 999,
}) => {
  const [zIndex, setZIndex] = useState(999);
  const [isLoading, setIsLoading] = useState(initialIsLoading);
  const [isShowLoader, setIsShowLoader] = useState(initialIsLoading);

  const sizeGrid = {
    small: {
      size: 40,
      strokeWidth: 2,
      strokeDashoffset: 300,
    },
    medium: {
      size: 75,
      strokeWidth: 3,
      strokeDashoffset: 240,
    },
    large: {
      size: 100,
      strokeWidth: 4,
      strokeDashoffset: 170,
    },
  };

  useEffect(() => {
    if (initialIsLoading) {
      setIsShowLoader(true);
      setIsLoading(true);
      setZIndex(minimumZIndex);
    }
    const delayTimeout = delay - 200 > 0 ? delay - 200 : 0;

    const timeout = setTimeout(() => {
      if (!initialIsLoading) {
        setIsLoading(false);
        setZIndex(-1);
        console.log(' setIsLoading(false);');
      }
    }, delay);

    const timeoutLoader = setTimeout(() => {
      if (!initialIsLoading) {
        console.log(' setIsShowLoader(false);');
        setIsShowLoader(false);
      }
    }, delayTimeout);

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeoutLoader);
    };
  }, [initialIsLoading]);

  const memoFallback = useMemo(() => (
    <div
      className={`fallback-loader 
      ${isFixed ? 'fallback-loader--fixed' : ''}
      ${isAbsolute ? 'fallback-loader--absolute' : ''}
      ${!isLoading ? 'fallback-loader--hide' : ''}
  `}
      style={{ zIndex, background: backgroundColor }}
    >
      <div className="fallback-loader__wrapper">
        <Loader
          isOpen={isShowLoader}
          size={sizeGrid[size].size}
          strokeWidth={sizeGrid[size].strokeWidth}
          strokeDashoffset={sizeGrid[size].strokeDashoffset}
        />
      </div>
    </div>
  ), [isFixed, isAbsolute, backgroundColor, size,
    isShowLoader, isLoading, zIndex]);

  return (
    <>{memoFallback}</>
  );
};
