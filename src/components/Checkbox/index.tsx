import React, { FC } from 'react';

interface ICheckbox {
  isActive: boolean;
  onClick: ()=>void;
  style?: any;
}

export const Checkbox: FC<ICheckbox> = ({ isActive, onClick, style }) => (
  <button
    className={`checkbox ${isActive ? 'checkbox--active' : ''}`}
    onClick={onClick}
    style={style}
  >
    <img src="/svg/tick.svg" alt="tick" />
  </button>
);
