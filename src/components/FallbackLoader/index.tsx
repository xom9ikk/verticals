import React, { FC, useEffect, useState } from 'react';
import { Loader } from '@comp/Loader';

interface IFallbackLoader {
  isLoading?: boolean
  isFixed?: boolean
}

export const FallbackLoader: FC<IFallbackLoader> = ({
  isLoading = true,
  isFixed,
}) => {
  const [zIndex, setZIndex] = useState(999);

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
      ${!isLoading ? 'fallback-loader--hide' : ''}
  `}
      style={{ zIndex }}
    >
      <div className="fallback-loader__wrapper">
        <Loader
          isOpen
          size={100}
          strokeWidth={4}
          strokeDashoffset={270}
        />
      </div>
    </div>
  );
};
