import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ControlButton } from '@comp/ControlButton';
import { MAX_SUB_TODO } from '@/constants';

interface ISubCardContainerToolbar {
  isHide: boolean;
  isCollapse: boolean;
  subTodosCount: number;
  onSwitchCollapse: () => void;
  onAddSubCard: () => void;
}

export const SubCardContainerToolbar: FC<ISubCardContainerToolbar> = ({
  isHide,
  isCollapse,
  subTodosCount,
  onSwitchCollapse,
  onAddSubCard,
}) => {
  const { t } = useTranslation();

  const isOverflow = subTodosCount > MAX_SUB_TODO;

  return (
    <div
      className="container container--horizontal"
      style={{
        opacity: isHide ? 0 : 1,
      }}
    >
      <ControlButton
        isHide={isCollapse && isOverflow}
        imageSrc="/assets/svg/add.svg"
        alt="add"
        text={t('Add subcard')}
        isInvisible
        isMaxWidth
        style={{
          margin: '1px 0',
          height: 30,
        }}
        isHoverBlock
        onClick={onAddSubCard}
      />
      <ControlButton
        isHide={!isOverflow}
        alt={isCollapse ? 'show' : 'hide'}
        text={isCollapse ? t('Show {{count}} more...', { count: subTodosCount - MAX_SUB_TODO }) : t('Hide')}
        isInvisible
        isMaxWidth={isCollapse}
        style={{
          margin: '1px 0',
          padding: `0 ${!isCollapse ? 25 : 6}px`,
          height: 30,
          transition: 'none',
        }}
        isHoverBlock
        onClick={onSwitchCollapse}
      />
    </div>
  );
};
