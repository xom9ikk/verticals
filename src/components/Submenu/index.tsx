import React, { FC, useRef, useState } from 'react';
import { icons } from '@/icons';
import { Popup } from '@comp/Popup';
import { MenuButton } from '@comp/MenuButton';

interface ISubmenu {
  text: string;
  imageSrc: string;
}

export const Submenu: FC<ISubmenu> = ({
  text, imageSrc, children,
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
      <MenuButton
        text={text}
        imageSrc={imageSrc}
        hintImageSrc={icons.menu.rightChevron}
      />
    </span>
  );
};
