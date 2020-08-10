import React, { FC } from 'react';
import { icons } from '@/icons';

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
      onChange={() => {
        onClick();
      }}
    />
    <div className={`checkbox__imitator ${isActive ? 'checkbox__imitator--active' : ''}`}>
      <img src={icons.tick} alt="tick" />
    </div>
  </div>
);
