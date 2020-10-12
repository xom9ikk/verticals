import React, { FC } from 'react';

interface IMenuButton {
  text: string;
  imageSrc?: string;
  hintText?: string;
  hintImageSrc?: string;
  isColoredHintImage?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const MenuButton: FC<IMenuButton> = ({
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
    className="menu-button"
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div className="menu-button__block">
      <div className="menu-button__row">
        {
          imageSrc ? (
            <img
              src={imageSrc}
              alt="ico"
              className="menu-button__icon"
            />
          ) : (
            <span className="menu-button__icon" />
          )
        }
        <div className="menu-button__content">
          {text}
        </div>
      </div>
      <div className="menu-button__additional-content">
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
          className={`menu-button__hint-icon ${isColoredHintImage ? 'menu-button__hint-icon--colored' : ''}`}
        />
      ) : null
    }
  </button>
);
