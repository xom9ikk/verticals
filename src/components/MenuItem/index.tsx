import React, { FC } from 'react';

interface IMenuItem {
  text: string;
  imageSrc?: string;
  hintText?: string;
  hintImageSrc?: string;
  isColoredHintImage?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const MenuItem: FC<IMenuItem> = ({
  text,
  imageSrc,
  hintText,
  hintImageSrc,
  isColoredHintImage,
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
}) => (
  <button
    type="button"
    className="menu-item"
    onClick={onClick}
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
          className={`menu-item__hint-icon ${isColoredHintImage ? 'menu-item__hint-icon--colored' : ''}`}
        />
      ) : null
    }
  </button>
);
