import React, { FC } from 'react';

interface ILoader {
  isOpen: boolean;
  size?: number;
  style?: any,
}

export const Loader: FC<ILoader> = ({
  isOpen,
  size = 25,
  style,
}) => (
  <div className={`loader ${!isOpen ? 'loader--hidden' : ''}`} style={style}>
    <svg
      style={{
        width: size,
        height: size,
      }}
    >
      <circle className="meter" cx={size / 2} cy={size / 2} r={size / 2 - 5} />
    </svg>
  </div>
);
