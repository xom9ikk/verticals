import cn from 'classnames';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ControlButton } from '@comp/ControlButton';

interface IColumnToolbar {
  isEnabled: boolean;
  isInvisible: boolean;
  onAddCard: () => void;
  onAddHeading: () => void;
}

export const ColumnToolbar: FC<IColumnToolbar> = ({
  isEnabled,
  isInvisible,
  onAddCard,
  onAddHeading,
}) => {
  const { t } = useTranslation();

  return isEnabled ? (
    <div
      className={cn('column-toolbar', {
        'column-toolbar--invisible': isInvisible,
      })}
    >
      <div className="column-toolbar__inner">
        <ControlButton
          imageSrc="/assets/svg/add.svg"
          text={t('Add card')}
          alt="add"
          isMaxWidth
          onClick={onAddCard}
        />
        <ControlButton
          imageSrc="/assets/svg/add-head.svg"
          alt="add"
          imageSize={24}
          size={36}
          tooltip={t('Add heading')}
          onClick={onAddHeading}
        />
      </div>
    </div>
  ) : null;
};
