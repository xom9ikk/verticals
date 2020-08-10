import React, { FC } from 'react';
import { icons } from '@/icons';
import { Menu } from '@comp/Menu';

interface ICardToolbar {
  isHoverBlock: boolean;
  onClickCard: () => void;
  onClickHeading: () => void;
}

export const CardToolbar: FC<ICardToolbar> = ({
  isHoverBlock,
  onClickCard,
  onClickHeading,
}) => (
  <div
    className={`card-toolbar ${!isHoverBlock ? 'card-toolbar--invisible' : ''}`}
  >
    <div className="card-toolbar__inner">
      <Menu
        imageSrc={icons.add}
        text="Add card"
        alt="add"
        isHoverBlock={isHoverBlock}
        isMaxWidth
        position="top"
        isShowPopup={false}
        onClick={onClickCard}
      />
      <Menu
        imageSrc={icons.addHead}
        alt="add"
        isHoverBlock={isHoverBlock}
        imageSize={24}
        size={36}
        isShowPopup={false}
        onClick={onClickHeading}
      />
    </div>
  </div>
);
