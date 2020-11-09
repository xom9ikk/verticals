import React, {
  FC, useMemo,
} from 'react';
import { EnumColors } from '@/types/entities';
import { useClickPreventionOnDoubleClick } from '@/use/clickPreventionOnDoubleClick';
import { useColorClass } from '@/use/colorClass';

interface IRoundedButton {
  icon: string;
  isSpecialIcon?: boolean;
  color?: EnumColors;
  text?: string;
  isActive?: boolean;
  onClick?: (e: React.SyntheticEvent) => void;
  onDoubleClick?: (e: React.SyntheticEvent) => void;
  onMouseOver?: (e: React.SyntheticEvent) => void;
  onMouseOut?: (e: React.SyntheticEvent) => void;
}

export const RoundedButton: FC<IRoundedButton> = ({
  icon,
  isSpecialIcon,
  color,
  text,
  isActive = false,
  onClick = () => {},
  onDoubleClick = () => {},
  onMouseOver,
  onMouseOut,
  children,
}) => {
  const colorClass = useColorClass('rounded-button', color);

  const {
    handleClick,
    handleDoubleClick,
  } = useClickPreventionOnDoubleClick(onClick, onDoubleClick, false);

  const roundedButton = useMemo(() => (
    <div
      className={`rounded-button 
       ${isActive ? 'rounded-button--active' : ''} 
       ${color !== undefined ? colorClass : ''} 
       `}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className="rounded-button__content">
        <img
          src={icon}
          alt="ico"
          className={`rounded-button__image 
          ${isSpecialIcon ? 'rounded-button__image--always-colored' : ''}
          `}
        />
        <span className="rounded-button__text">{text}</span>
        {children}
      </div>
    </div>
  ), [
    isActive,
    text,
    color,
    icon,
    children,
  ]);

  return (
    <>{ roundedButton }</>
  );
};
