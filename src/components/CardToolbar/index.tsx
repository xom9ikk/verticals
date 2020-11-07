import React, { FC } from 'react';
import { ControlButton } from '@comp/ControlButton';

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
      <ControlButton
        imageSrc="/assets/svg/add.svg"
        text="Add card"
        alt="add"
        isHoverBlock={isHoverBlock}
        isMaxWidth
        onClick={onClickCard}
      />
      <ControlButton
        imageSrc="/assets/svg/add-head.svg"
        alt="add"
        isHoverBlock={isHoverBlock}
        imageSize={24}
        size={36}
        onClick={onClickHeading}
      />
    </div>
  </div>
);
