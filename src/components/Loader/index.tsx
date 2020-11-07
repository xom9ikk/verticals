import React, { FC } from 'react';

interface ILoader {
  isOpen: boolean;
  size?: number;
  strokeWidth?: number;
  strokeDashoffset?: number;
  style?: React.CSSProperties,
}

export const Loader: FC<ILoader> = ({
  isOpen,
  size = 25,
  strokeWidth = 2,
  strokeDashoffset = 325,
  style,
}) => (
  <div className={`loader ${!isOpen ? 'loader--hidden' : ''}`} style={style}>
    <svg
      style={{
        width: size,
        height: size,
      }}
    >
      <circle
        className="meter"
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 5}
        style={{
          strokeWidth,
          strokeDashoffset,
        }}
      />
    </svg>
  </div>
);
