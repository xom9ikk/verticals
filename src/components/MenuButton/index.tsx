import React, { FC } from 'react';

interface IMenuButton {
  text: string;
  imageSrc?: string;
  hintText?: string;
  hintImageSrc?: string;
  onClick?: ()=>void;
  onMouseEnter?: ()=>void;
  onMouseLeave?: ()=>void;
}

export const MenuButton: FC<IMenuButton> = ({
  text,
  imageSrc,
  hintText,
  hintImageSrc,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => (
  <button
    type="button"
    className="menu-button"
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div className="menu-button__block">
      {
            imageSrc && (
            <img
              src={imageSrc}
              alt="ico"
              className="menu-button__icon"
            />
            )
        }
      {text}
    </div>
    {
      hintText ? <span>{hintText}</span> : null
    }
    {
      hintImageSrc ? <img src={hintImageSrc} alt="hint" className="menu-button__hint-icon" /> : null
    }
  </button>
);
