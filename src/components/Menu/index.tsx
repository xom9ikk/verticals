import React, { FC, useState } from 'react';
import { Popup } from '../Popup';

interface IMenu {
  imageSrc: string;
  text?: string;
  alt: string;
  isHoverBlock?: boolean;
  imageSize?: number;
  size?: number;
  isHide?: boolean;
  onClick?: ()=>void;
  isMaxWidth?:boolean;
  onMouseEnter?:()=>void;
  onMouseLeave?:()=>void;
  position?: 'top' | 'left' | 'right' | 'bottom';
}

export const Menu: FC<IMenu> = ({
  imageSrc,
  text,
  alt,
  isHoverBlock = false,
  imageSize = 12,
  size,
  isHide = false,
  onClick,
  isMaxWidth,
  onMouseEnter,
  onMouseLeave,
  position,
  children,
}) => {
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const classes = ['menu'];
  if (isHide && !isHoverBlock) {
    classes.push('menu--invisible');
  }
  if (isHoverBlock) {
    classes.push('menu--hover-block');
  }
  if (isMaxWidth) {
    classes.push('menu--max-width');
  }
  console.log(children);
  return (
    <>
      <Popup
        isOpen={isOpenPopup}
        position={position}
      >
        {children}
      </Popup>
      <button
        className={classes.join(' ')}
        style={size ? { height: size, width: size } : {}}
        onClick={() => {
          onClick?.();
          setIsOpenPopup((prev) => !prev);
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
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
    </>
  );
};
