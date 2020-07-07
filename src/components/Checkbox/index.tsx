import React, { FC } from 'react';

interface ICheckbox {
  isActive: boolean;
  onClick: ()=>void;
  style?: any;
}

export const Checkbox: FC<ICheckbox> = ({ isActive, onClick, style }) => (
  <div
    className="checkbox"
    style={style}
    onClick={(e) => e.stopPropagation()}
  >
    <input
      type="checkbox"
      className="checkbox__input"
      defaultChecked={isActive}
      onChange={(event) => {
        console.log('change');
        onClick();
      }}
    />
    <div className={`checkbox__imitator ${isActive ? 'checkbox__imitator--active' : ''}`}>
      <img src="/svg/tick.svg" alt="tick" />
    </div>
  </div>
);
