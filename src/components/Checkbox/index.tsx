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
  >
    <input
      type="checkbox"
      className="checkbox__input"
      defaultChecked={isActive}
      onChange={() => {
        console.log('change');
        onClick();
      }}
    />
    <div className={`checkbox__imitator ${isActive ? 'checkbox__imitator--active' : ''}`}>
      <img src="/svg/tick.svg" alt="tick" />
    </div>
    {/* { */}
    {/*  isActive && <img src="/svg/tick.svg" alt="tick" /> */}
    {/* } */}
  </div>
);
