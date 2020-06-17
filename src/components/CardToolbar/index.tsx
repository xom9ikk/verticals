import React, { FC } from 'react';
import { Menu } from '../Menu';

interface ICardToolbar {
  isHoverBlock: boolean;
}

export const CardToolbar: FC<ICardToolbar> = ({ isHoverBlock }) => (
  <div
    className={`card-toolbar ${!isHoverBlock ? 'card-toolbar--invisible' : ''}`}
  >
    <div className="card-toolbar__inner">
      <Menu
        imageSrc="/svg/add.svg"
        text="Add card"
        alt="add"
        isHoverBlock={isHoverBlock}
        isMaxWidth
      />
      <Menu
        imageSrc="/svg/add-head.svg"
        alt="add"
        isHoverBlock={isHoverBlock}
        imageSize={24}
        size={36}
      />
    </div>
  </div>
);
