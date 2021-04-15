import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { ColorPicker } from '@comp/ColorPicker';
import { DatePicker } from '@comp/DatePicker';
import { Divider } from '@comp/Divider';
import { Menu } from '@comp/Menu';
import { MenuItem } from '@comp/Menu/Item';
import { SubMenu } from '@comp/Menu/Sub';
import { CommentsActions, SubTodosActions, SystemActions } from '@store/actions';
import {
  getActiveBoardReadableId,
  getActivePopupId,
  getUsername,
} from '@store/selectors';
import {
  EnumTodoStatus, IColor,
} from '@type/entities';
import { useHostname } from '@use/hostname';
import { useOpenFiles } from '@use/openFiles';
import { useReadableId } from '@use/readableId';

interface ISubTodoContextMenu {
  menuId: string;
  subTodoId: number;
  title: string;
  todoId: number;
  isActive?: boolean;
  isNotificationsEnabled?: boolean;
  expirationDate?: Date | null;
  color?: IColor;
  status?: EnumTodoStatus;
  size?: number;
  imageSize?: number;
  isPrimary?: boolean;
  isColored?: boolean;
  onStartEdit: () => void;
  onChangeColor: (newColor: IColor) => void;
  isTransformedPosition?: boolean;
}

enum EnumCardActions {
  ChangeColor,
  EditSubCard,
  AttachFile,
  AddDate,
  CompleteStatus,
  Notifications,
  CopyLink,
  Duplicate,
  AddSubCardBelow,
  Delete,
}

export const SubTodoContextMenu: FC<ISubTodoContextMenu> = ({
  menuId,
  subTodoId,
  title,
  todoId,
  isActive,
  isNotificationsEnabled,
  expirationDate,
  color,
  status,
  size,
  imageSize,
  isPrimary,
  isColored,
  onStartEdit,
  onChangeColor,
  isTransformedPosition = true,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { toReadableId } = useReadableId();
  const { openFiles } = useOpenFiles();
  const hostname = useHostname();

  const username = useSelector(getUsername);
  const activeBoardReadableId = useSelector(getActiveBoardReadableId);

  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isOpenDatePicker, setIsOpenDatePicker] = useState<boolean>(false);

  const menuButtonRef = useRef<any>();

  const handleUploadFiles = async () => {
    const formData = await openFiles('*', true);
    dispatch(CommentsActions.effect.create({
      subTodoId: subTodoId!,
      text: '',
      files: formData,
    }));
  };

  const handleMenuButtonClick = (action: EnumCardActions, payload?: any) => {
    console.log('handleMenuButtonClick subtodo', action);
    switch (action) {
      case EnumCardActions.ChangeColor: {
        onChangeColor(payload);
        break;
      }
      case EnumCardActions.EditSubCard: {
        onStartEdit();
        break;
      }
      case EnumCardActions.AttachFile: {
        handleUploadFiles();
        break;
      }
      case EnumCardActions.AddDate: {
        setIsOpenDatePicker(true);
        break;
      }
      case EnumCardActions.CompleteStatus: {
        dispatch(SubTodosActions.effect.update({
          id: subTodoId!,
          status: payload,
        }));
        break;
      }
      case EnumCardActions.Notifications: {
        dispatch(SubTodosActions.effect.update({
          id: subTodoId!,
          isNotificationsEnabled: !isNotificationsEnabled,
        }));
        break;
      }
      case EnumCardActions.CopyLink: {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
          dispatch(SystemActions.setActivePopupId(null));
        }, 1000);
        return;
      }
      case EnumCardActions.Duplicate: {
        dispatch(SubTodosActions.effect.duplicate({ subTodoId: subTodoId! }));
        break;
      }
      case EnumCardActions.AddSubCardBelow: {
        dispatch(SubTodosActions.removeTemp());
        dispatch(SubTodosActions.drawBelow({
          belowId: subTodoId!,
          todoId: todoId!,
        }));
        break;
      }
      case EnumCardActions.Delete: {
        dispatch(SubTodosActions.effect.remove({ id: subTodoId }));
        break;
      }
      default: break;
    }
  };

  const activePopupId = useSelector(getActivePopupId);

  useEffect(() => {
    setIsOpenDatePicker(false);
  }, [activePopupId]);

  const handleSelectDate = (selectedDate: Date | null) => {
    dispatch(SystemActions.setActivePopupId(null));
    dispatch(SubTodosActions.effect.update({
      id: subTodoId!,
      expirationDate: selectedDate,
    }));
  };

  const handleColorPick = (newColor: IColor) => handleMenuButtonClick(EnumCardActions.ChangeColor, newColor);

  const handleCopy = () => {
    handleMenuButtonClick(EnumCardActions.CopyLink);
  };

  return subTodoId && title ? (
    <Menu
      ref={menuButtonRef}
      buttonClassName="subcard-context-menu"
      id={`${menuId}-card-${subTodoId}`}
      imageSrc={`/assets/svg/dots${isPrimary ? '-primary' : ''}.svg`}
      alt="menu"
      imageSize={imageSize || 22}
      size={size || 24}
      isInvisible
      isColored={isColored}
      isInvertColor={isActive}
      position="right"
      style={isTransformedPosition ? {
        float: 'right',
      } : {}}
      width={isOpenDatePicker ? 328 : undefined}
      onSelect={handleMenuButtonClick}
    >
      {
        isOpenDatePicker ? (
          <DatePicker
            isOpen={isOpenDatePicker}
            selectedDate={expirationDate}
            onSelectDate={handleSelectDate}
          />
        ) : (
          [
            <ColorPicker
              key={0}
              onPick={handleColorPick}
              activeColor={color}
            />,
            <MenuItem
              key={1}
              text={t('Edit subcard')}
              imageSrc="/assets/svg/menu/edit.svg"
              action={EnumCardActions.EditSubCard}
            />,
            <MenuItem
              key={2}
              text={t('Attach file')}
              imageSrc="/assets/svg/menu/attach.svg"
              action={EnumCardActions.AttachFile}
            />,
            <MenuItem
              key={3}
              text={t('Add date')}
              imageSrc="/assets/svg/menu/add-date.svg"
              action={EnumCardActions.AddDate}
              isAutoClose={false}
            />,
            <SubMenu
              key={4}
              text={t('Complete')}
              imageSrc="/assets/svg/menu/complete.svg"
            >
              <MenuItem
                text={t('Mark as to do')}
                imageSrc="/assets/svg/menu/rounded-square.svg"
                hintImageSrc={`${status === EnumTodoStatus.Todo ? '/assets/svg/menu/tick.svg' : ''}`}
                isColoredHintImage
                action={EnumCardActions.CompleteStatus}
                payload={EnumTodoStatus.Todo}
              />
              <MenuItem
                text={t('Mark as doing')}
                imageSrc="/assets/svg/menu/rounded-square-half-filled.svg"
                hintImageSrc={`${status === EnumTodoStatus.Doing ? '/assets/svg/menu/tick.svg' : ''}`}
                isColoredHintImage
                action={EnumCardActions.CompleteStatus}
                payload={EnumTodoStatus.Doing}
              >
                <span>Alt</span>
                +
                <span>{t('Click')}</span>
                {t('on a checkbox to mark as doing')}
              </MenuItem>
              <MenuItem
                text={t('Mark as done')}
                imageSrc="/assets/svg/menu/rounded-square-check.svg"
                hintImageSrc={`${status === EnumTodoStatus.Done ? '/assets/svg/menu/tick.svg' : ''}`}
                isColoredHintImage
                action={EnumCardActions.CompleteStatus}
                payload={EnumTodoStatus.Done}
              />
              <MenuItem
                text={t('Mark as canceled')}
                imageSrc="/assets/svg/menu/rounded-square-canceled.svg"
                hintImageSrc={`${status === EnumTodoStatus.Canceled ? '/assets/svg/menu/tick.svg' : ''}`}
                isColoredHintImage
                action={EnumCardActions.CompleteStatus}
                payload={EnumTodoStatus.Canceled}
              >
                <span>Shift</span>
                +
                <span>{t('Click')}</span>
                {t('on a checkbox to mark as canceled')}
              </MenuItem>
            </SubMenu>,
            <Divider
              key={5}
              verticalSpacer={7}
              horizontalSpacer={10}
            />,
            <MenuItem
              key={6}
              text={t('Notifications')}
              imageSrc="/assets/svg/menu/notifications.svg"
              hintImageSrc={`${isNotificationsEnabled ? '/assets/svg/menu/tick.svg' : ''}`}
              isColoredHintImage
              action={EnumCardActions.Notifications}
            />,
            <CopyToClipboard
              key={7}
              text={`${hostname}/${username}/${activeBoardReadableId}/subcard/${toReadableId(
                title, subTodoId,
              )}`}
              onCopy={handleCopy}
            >
              <MenuItem
                text={isCopied ? t('Copied!') : t('Copy link')}
                imageSrc="/assets/svg/menu/copy-link.svg"
                isAutoClose={false}
              />
            </CopyToClipboard>,
            <MenuItem
              key={8}
              text={t('Duplicate')}
              imageSrc="/assets/svg/menu/duplicate.svg"
              action={EnumCardActions.Duplicate}
            />,
            <Divider
              key={9}
              verticalSpacer={7}
              horizontalSpacer={10}
            />,
            <MenuItem
              key={10}
              text={t('Add subcard below')}
              imageSrc="/assets/svg/menu/add-card.svg"
              action={EnumCardActions.AddSubCardBelow}
            />,
            <Divider
              key={11}
              verticalSpacer={7}
              horizontalSpacer={10}
            />,
            <MenuItem
              key={12}
              text={t('Delete')}
              imageSrc="/assets/svg/menu/remove.svg"
              hintText="⌫"
              action={EnumCardActions.Delete}
            />,
          ]
        )
      }
    </Menu>
  ) : null;
};
