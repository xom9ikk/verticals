import React, { FC, useRef, useState } from 'react';
import { Popup } from '@comp/Popup';
import { MenuItem } from '@comp/Menu/Item';

interface ISubMenu {
  text: string;
  imageSrc: string;
  maxHeight?: number;
  isHideVerticalScroll?: boolean;
  isHideHorizontalScroll?: boolean;
}

export const SubMenu: FC<ISubMenu> = ({
  text,
  imageSrc,
  maxHeight,
  isHideVerticalScroll,
  isHideHorizontalScroll,
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
        isHideVerticalScroll={isHideVerticalScroll}
        isHideHorizontalScroll={isHideHorizontalScroll}
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
