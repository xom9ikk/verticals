import React, {
  FC, useMemo,
} from 'react';
import { ColorSelector } from '../ColorSelector';
import { EnumColors } from '../../types';

interface IColorPicker {
  onPick: (color: number)=>void;
}

export const ColorPicker: FC<IColorPicker> = ({ onPick }) => {
  // const [colors, setColors] = useState<Array<string>>([]);
  //
  // useEffect(() => {
  //   console.log(Object.entries(EnumColors));
  //   const enumAll = Object.values(EnumColors);
  //   // const half = Math.ceil(enumAll.length / 2);
  //   // @ts-ignore
  //   // console.log(EnumColors['#9cc447']);
  //   setColors(enumAll)
  // }, []);

  const memoColorPicker = useMemo(() => (
    <div className="color-picker">
      {
        Object.entries(EnumColors)
          .map((color, index) => (
            <ColorSelector
              key={color[0]}
              color={color[1]}
              onClick={() => { onPick(index); }}
            />
          ))
        }
    </div>
  ), []);
  return (
    <>
      { memoColorPicker }
    </>
  );
};
