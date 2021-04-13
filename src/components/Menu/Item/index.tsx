import cn from 'classnames';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { SystemActions } from '@store/actions';

interface IMenuItem {
  text: string;
  imageSrc?: string;
  hintText?: string;
  hintImageSrc?: string;
  isColoredHintImage?: boolean;
  isAutoClose?: boolean;
  onClick?: () => void;
  action?: number;
  payload?: any;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const MenuItem: FC<IMenuItem> = ({
  text,
  imageSrc,
  hintText,
  hintImageSrc,
  isColoredHintImage,
  isAutoClose = true,
  onClick,
  // action,
  onMouseEnter,
  onMouseLeave,
  children,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (isAutoClose) {
      dispatch(SystemActions.setActivePopupId(null));
    }
    onClick?.();
  };

  return (
    <button
      type="button"
      className="menu-item"
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="menu-item__block">
        <div className="menu-item__row">
          {
              imageSrc ? (
                <img
                  src={imageSrc}
                  alt="ico"
                  className="menu-item__icon"
                />
              ) : (
                <span className="menu-item__icon" />
              )
            }
          <div className="menu-item__content">
            {text}
          </div>
        </div>
        <div className="menu-item__additional-content">
          {children}
        </div>
      </div>
      {
          hintText ? <span>{hintText}</span> : null
      }
      {
        hintImageSrc ? (
          <img
            src={hintImageSrc}
            alt="hint"
            className={cn('menu-item__hint-icon', {
              'menu-item__hint-icon--colored': isColoredHintImage,
            })}
          />
        ) : null
      }
    </button>
  );
};
