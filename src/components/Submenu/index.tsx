import React, { FC, useRef, useState } from 'react';
import { Popup } from '@comp/Popup';
import { MenuItem } from '@comp/MenuItem';

interface ISubmenu {
  text: string;
  imageSrc: string;
}

export const Submenu: FC<ISubmenu> = ({
  text,
  imageSrc,
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
        style={{ marginLeft: 0, marginTop: -7 }}
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
