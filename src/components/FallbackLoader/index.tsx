import React, { FC } from 'react';
import { Loader } from '@comp/Loader';

interface IFallbackLoader {
}

export const FallbackLoader: FC<IFallbackLoader> = () => (
  <div className="fallback-loader">
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
