import React, { FC } from 'react';

interface ICheckbox {
  isActive: boolean;
  onClick: ()=>void;
}

export const Checkbox: FC<ICheckbox> = ({ isActive, onClick }) => (
  <button
    className={`checkbox ${isActive ? 'checkbox--active' : ''}`}
    onClick={onClick}
  >
    <img src="/svg/tick.svg" alt="tick" />
  </button>
);
