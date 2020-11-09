import { EnumColors } from '@/types/entities';

export const useColorClass = (baseClass: string, color?: EnumColors) => {
  if (color === undefined) {
    return '';
  }
  const colorValues = Object.values(EnumColors);
  const colorString = colorValues[color] as string;
  return `${baseClass}--${colorString?.toLowerCase()}`;
};