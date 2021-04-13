import React, {
  FC, useMemo,
} from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  EnumCardType, EnumDroppedZoneType, IColor,
} from '@type/entities';
import {
  SystemActions,
} from '@store/actions';
import { redirectTo } from '@router/history';
import {
  getActiveBoardReadableId,
  getUsername,
} from '@store/selectors';
import { DropZone } from '@comp/DropZone';
import { ControlButton } from '@comp/ControlButton';
import { useColorClass } from '@use/colorClass';
import { lazy } from '@router/lazy';
import { suspense } from '@comp/SuspenseWrapper';

const CommentsWrapper = lazy(() => import('@comp/Comments/Wrapper'), (module) => module.CommentsWrapper);

interface ICardPopup {
  cardType: EnumCardType;
  isOpen: boolean;
  color: IColor;
}

export const CardPopup: FC<ICardPopup> = ({
  cardType,
  isOpen,
  color,
  children,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const activeBoardReadableId = useSelector(getActiveBoardReadableId);
  const username = useSelector(getUsername);

  const colorClass = useColorClass('card-popup__inner', color);

  const handleClose = () => {
    redirectTo(`/${username}/${activeBoardReadableId}`);
  };

  const handleDropFiles = (files: FileList) => {
    dispatch(SystemActions.setDroppedFiles({
      type: EnumDroppedZoneType.CardPopup,
      files,
    }));
  };

  return useMemo(() => (
    <div
      className={cn('card-popup', {
        'card-popup--open': isOpen,
      })}
    >
      {isOpen && (
      <div
        className={cn('card-popup__inner', {
          [colorClass]: colorClass,
        })}
      >
        <DropZone onOpen={handleDropFiles}>
          <ControlButton
            imageSrc="/assets/svg/close.svg"
            alt="close"
            imageSize={16}
            size={26}
            style={{
              position: 'absolute',
              right: 6,
              top: 6,
            }}
            onClick={handleClose}
          />
          {children}
          {suspense(CommentsWrapper)()}
        </DropZone>
      </div>
      )}
    </div>
  ),
  [
    t,
    isOpen,
    colorClass,
    cardType,
    children,
  ]);
};
