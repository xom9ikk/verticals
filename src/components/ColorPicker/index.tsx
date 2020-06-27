import React, {
  FC, useMemo,
} from 'react';
import { ColorSelector } from '../ColorSelector';
import { EnumColors } from '../../types';

interface IColorPicker {
  onPick: (color: number)=>void;
  activeColor?: number;
}

export const ColorPicker: FC<IColorPicker> = ({ onPick, activeColor }) => {
  const memoColorPicker = useMemo(() => (
    <div className="color-picker">
      {
        Object.entries(EnumColors)
          .map((color, index) => (
            <ColorSelector
              key={color[0]}
              color={color[1]}
              isActive={activeColor === index}
              onClick={() => { onPick(index); }}
            />
          ))
        }
    </div>
  ), [activeColor, onPick]);

  return (
    <>
      { memoColorPicker }
    </>
  );
};
