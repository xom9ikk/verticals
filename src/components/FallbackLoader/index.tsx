import React, { FC, useEffect, useState } from 'react';
import { Loader } from '@comp/Loader';

interface IFallbackLoader {
  backgroundColor?: string;
  isLoading?: boolean
  isFixed?: boolean
  isAbsolute?: boolean
  size?: 'small' | 'medium' | 'large'
}

export const FallbackLoader: FC<IFallbackLoader> = ({
  backgroundColor,
  isLoading = true,
  isFixed,
  isAbsolute,
  size = 'large',
}) => {
  const [zIndex, setZIndex] = useState(999);

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
    const timeout = setTimeout(() => {
      setZIndex(isLoading ? 999 : -1);
    }, 500);
    return () => clearTimeout(timeout);
  }, [isLoading]);

  return (
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
          isOpen
          size={sizeGrid[size].size}
          strokeWidth={sizeGrid[size].strokeWidth}
          strokeDashoffset={sizeGrid[size].strokeDashoffset}
        />
      </div>
    </div>
  );
};
