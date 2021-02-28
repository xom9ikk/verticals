import { EnumColors, IColor } from '@type/entities';

export const useColorClass = (baseClass: string, color?: IColor) => {
  if (color === undefined || color === null) {
    return '';
  }
  const colorValues = Object.values(EnumColors);
  const colorString = colorValues[color] as string;
  return `${baseClass}--${colorString?.toLowerCase()}`;
};
