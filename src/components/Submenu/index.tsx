import React, { FC, useState } from 'react';
import { Popup } from '../Popup';
import { MenuButton } from '../MenuButton';

interface ISubmenu {
  text: string;
  imageSrc: string;
}

export const Submenu: FC<ISubmenu> = ({
  text, imageSrc, children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <span
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Popup
        isOpen={isOpen}
        position="right"
        style={{ marginLeft: 0, marginTop: -7 }}
      >
        {children}
      </Popup>
      <MenuButton
        text={text}
        imageSrc={imageSrc}
        hintImageSrc="/svg/menu/right-chevron.svg"
      />
    </span>
  );
};
