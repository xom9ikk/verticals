import React, {
  FC, useMemo,
} from 'react';
import { EnumColors } from '@/types';
import { useClickPreventionOnDoubleClick } from '@/use/clickPreventionOnDoubleClick';

interface IRoundedButton {
  icon: string;
  color?: EnumColors;
  text?: string;
  isActive?: boolean;
  onClick?: (e: React.SyntheticEvent)=>void;
  onDoubleClick?: (e: React.SyntheticEvent)=>void;
}

export const RoundedButton: FC<IRoundedButton> = ({
  icon,
  color,
  text,
  isActive = false,
  onClick = () => {},
  onDoubleClick = () => {},
}) => {
  // @ts-ignore
  const colorClass = `rounded-button--${Object.values(EnumColors)[color]?.toLowerCase()}`;

  const {
    handleClick,
    handleDoubleClick,
  } = useClickPreventionOnDoubleClick(onClick, onDoubleClick, true);

  const roundedButton = useMemo(() => (
    <div
      className={`rounded-button 
       ${isActive ? 'rounded-button--active' : ''} 
       ${color !== undefined ? colorClass : ''} 
       `}
      // onMouseOver={() => setIsHover(true)}
      // onMouseOut={() => setIsHover(false)}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className="rounded-button__content">
        <img
          src={`${isActive
            ? icon.replace('item', 'item-active')
            : icon}`}
          alt="ico"
          className="rounded-button__image"
        />
        <span className="rounded-button__text">{text}</span>
      </div>
    </div>
  ), [
    isActive,
    text,
    color,
  ]);

  return (
    <>{ roundedButton }</>
  );
};
