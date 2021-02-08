import React, { FC, useMemo } from 'react';
import { ColorSelector } from '@comp/ColorSelector';
import { colors, EnumColors } from '@type/entities';

interface IColorPicker {
  onPick: (color: EnumColors) => void;
  activeColor?: EnumColors;
}

export const ColorPicker: FC<IColorPicker> = ({ onPick, activeColor }) => {
  const memoColorPicker = useMemo(() => (
    <div className="color-picker">
      {
        Object.values(EnumColors)
          .filter((v) => Number.isFinite(v))
          .map((color, index) => (
            <ColorSelector
              key={colors[Number(color)]}
              color={colors[Number(color)]}
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
