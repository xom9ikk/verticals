import React, { FC } from 'react';

interface IOpacityButton {
  imageSrc: string;
  text?: string;
  alt: string;
  isHoverBlock?: boolean;
  imageSize?: number;
  size?: number;
  isHide?: boolean;
  onClick?: ()=>void;
}

export const OpacityButton: FC<IOpacityButton> = ({
  imageSrc,
  text,
  alt,
  isHoverBlock = false,
  imageSize = 12,
  size,
  isHide = false,
  onClick,
}) => {
  const classes = ['opacity-button'];
  if (isHide && !isHoverBlock) {
    classes.push('opacity-button--invisible');
  }
  if (isHoverBlock) {
    classes.push('opacity-button--hover-block');
  }
  return (
    <button
      className={classes.join(' ')}
      style={size ? { height: size, width: size } : {}}
      onClick={onClick}
    >
      <img
        src={imageSrc}
        alt={alt}
        style={{ width: imageSize, height: imageSize }}
      />
      {
          text ? (<span>{text}</span>) : null
        }
    </button>
  );
};
