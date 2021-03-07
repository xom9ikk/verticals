import React, { FC } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { ControlButton } from '@comp/ControlButton';

interface IColumnToolbar {
  isEnabled: boolean;
  isHoverBlock: boolean;
  onAddCard: () => void;
  onAddHeading: () => void;
}

export const ColumnToolbar: FC<IColumnToolbar> = ({
  isEnabled,
  isHoverBlock,
  onAddCard,
  onAddHeading,
}) => {
  const { t } = useTranslation();

  return isEnabled ? (
    <div
      className={cn('column-toolbar', {
        'column-toolbar--invisible': !isHoverBlock,
      })}
    >
      <div className="column-toolbar__inner">
        <ControlButton
          imageSrc="/assets/svg/add.svg"
          text={t('Add card')}
          alt="add"
          isHoverBlock={isHoverBlock}
          isMaxWidth
          onClick={onAddCard}
        />
        <ControlButton
          imageSrc="/assets/svg/add-head.svg"
          alt="add"
          isHoverBlock={isHoverBlock}
          imageSize={24}
          size={36}
          onClick={onAddHeading}
        />
      </div>
    </div>
  ) : null;
};
