import React, { FC, useMemo } from 'react';
import { ColorSelector } from '@comp/ColorSelector';
import { colors, EnumColors, IColor } from '@type/entities';

interface IColorPicker {
  activeColor?: IColor;
  onPick: (color: IColor) => void;
}

export const ColorPicker: FC<IColorPicker> = ({ onPick, activeColor }) => {
  const memoColorPicker = useMemo(() => (
    <div className="color-picker">
      {
        Object.values(EnumColors)
          .filter((v) => Number.isFinite(v))
          .map((color, index) => {
            const isActive = activeColor === index;
            return (
              <ColorSelector
                key={colors[Number(color)]}
                color={colors[Number(color)]}
                isActive={isActive}
                onClick={() => {
                  onPick(isActive ? null : index);
                }}
              />
            );
          })
        }
    </div>
  ), [activeColor, onPick]);

  return (
    <>
      { memoColorPicker }
    </>
  );
};
