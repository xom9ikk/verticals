import React, { FC } from 'react';
import { ColorSelector } from '../ColorSelector';

interface IColorPicker {
  colors: Array<string>;
  onClick: (color: string)=>void;
}

export const ColorPicker: FC<IColorPicker> = ({ colors, onClick }) => (
  <div className="color-picker">
    {
      colors.map((color) => (
        <ColorSelector
          key={color}
          color={color}
          onClick={onClick}
        />
      ))
    }
  </div>
);
