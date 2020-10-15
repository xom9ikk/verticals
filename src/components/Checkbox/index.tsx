import React, { FC } from 'react';

interface ICheckbox {
  isActive: boolean;
  onChange: (event: any) => void;
  style?: any;
}

export const Checkbox: FC<ICheckbox> = ({ isActive, onChange, style }) => (
  <div
    className="checkbox"
    style={style}
    onClick={(e) => e.stopPropagation()}
  >
    <input
      type="checkbox"
      className="checkbox__input"
      defaultChecked={isActive}
      onChange={(e) => {
        onChange(e);
      }}
    />
    <div className={`checkbox__imitator ${isActive ? 'checkbox__imitator--active' : ''}`}>
      <img src="/assets/svg/tick.svg" alt="tick" />
    </div>
  </div>
);
