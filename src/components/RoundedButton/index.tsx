import React, { FC, useMemo } from 'react';
import cn from 'classnames';
import { IColor } from '@type/entities';
import { useClickPreventionOnDoubleClick } from '@use/clickPreventionOnDoubleClick';
import { useColorClass } from '@use/colorClass';

interface IRoundedButton {
  icon: string;
  isSpecialIcon?: boolean;
  color?: IColor;
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
      className={cn('rounded-button', colorClass, {
        'rounded-button--active': isActive,
      })}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className="rounded-button__content">
        <img
          src={icon}
          alt="ico"
          className={cn('rounded-button__image', {
            'rounded-button__image--always-colored': isSpecialIcon,
          })}
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
