import React, { FC } from 'react';

interface IMenuButton {
  text: string;
  imageSrc: string;
  hintText?: string;
  hintImageSrc?: string;
}

export const MenuButton: FC<IMenuButton> = ({
  text, imageSrc, hintText, hintImageSrc,
}) => (
  <button type="button" className="menu-button">
    <div className="menu-button__block">
      <img src={imageSrc} alt="ico" />
      {text}
    </div>
    {
      hintText ? <span>{hintText}</span> : null
    }
    {
      hintImageSrc ? <img src={hintImageSrc} alt="hint" /> : null
    }
  </button>
);
