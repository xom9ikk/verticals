import React, { FC, useRef, useState } from 'react';
import { Popup } from '@comp/Popup';
import { MenuItem } from '@comp/MenuItem';

interface ISubmenu {
  text: string;
  imageSrc: string;
  maxHeight?: number;
  isHideScroll?: boolean;
}

export const Submenu: FC<ISubmenu> = ({
  text,
  imageSrc,
  maxHeight,
  isHideScroll,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sourceRef = useRef<any>(null);

  return (
    <span
      ref={sourceRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Popup
        isOpen={isOpen}
        isSubMenu
        sourceRef={sourceRef}
        position="right"
        isAbsolute={false}
        maxHeight={maxHeight}
        isHideScroll={isHideScroll}
        style={{ marginLeft: -10, marginTop: -7 }}
      >
        {children}
      </Popup>
      <MenuItem
        text={text}
        imageSrc={imageSrc}
        isAutoClose={false}
        hintImageSrc="/assets/svg/menu/right-chevron.svg"
      />
    </span>
  );
};
