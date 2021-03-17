import React, {
  FC, useEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from '@comp/Menu';
import { ColorPicker } from '@comp/ColorPicker';
import { MenuItem } from '@comp/MenuItem';
import { Submenu } from '@comp/Submenu';
import {
  EnumHeadingType, EnumTodoStatus, IColor, IHeading,
} from '@type/entities';
import { Divider } from '@comp/Divider';
import { CommentsActions, SystemActions, TodosActions } from '@store/actions';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useReadableId } from '@use/readableId';
import {
  getActiveBoardReadableId, getActivePopupId, getHeadingById, getUsername,
} from '@store/selectors';
import { useOpenFiles } from '@use/openFiles';
import { DatePicker } from '@comp/DatePicker';
import { useTranslation } from 'react-i18next';
import { useParamSelector } from '@use/paramSelector';

interface ICardContextMenu {
  menuId: string;
  todoId: number;
  title: string;
  headingId: number;
  isActive?: boolean;
  isHover: boolean;
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
  EditCard,
  AttachFile,
  AddDate,
  CompleteStatus,
  Notifications,
  CopyLink,
  Duplicate,
  AddCardBelow,
  Archive,
  Delete,
  Restore,
}

export const CardContextMenu: FC<ICardContextMenu> = ({
  menuId,
  todoId,
  title,
  headingId,
  isActive,
  isHover,
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

  const username = useSelector(getUsername);
  const activeBoardReadableId = useSelector(getActiveBoardReadableId);
  const heading = useParamSelector(getHeadingById, headingId) as IHeading;
  const isArchivedHeading = heading.type === EnumHeadingType.Archived;

  const isRemovedCards = activeBoardReadableId === 'trash';

  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isOpenDatePicker, setIsOpenDatePicker] = useState<boolean>(false);

  const menuButtonRef = useRef<any>();

  const handleUploadFiles = async () => {
    const openedFiles = await openFiles('*', true);
    dispatch(CommentsActions.effect.create({
      todoId: todoId!,
      text: '',
      files: openedFiles,
    }));
  };

  const handleMenuButtonClick = (action: EnumCardActions, payload?: any) => {
    switch (action) {
      case EnumCardActions.ChangeColor: {
        onChangeColor(payload);
        break;
      }
      case EnumCardActions.EditCard: {
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
        dispatch(TodosActions.effect.update({
          id: todoId!,
          status: payload,
        }));
        break;
      }
      case EnumCardActions.Notifications: {
        dispatch(TodosActions.effect.update({
          id: todoId!,
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
        dispatch(TodosActions.effect.duplicate({ todoId: todoId! }));
        break;
      }
      case EnumCardActions.AddCardBelow: {
        dispatch(TodosActions.removeTemp());
        dispatch(TodosActions.drawBelow({
          belowId: todoId!,
          headingId: headingId!,
        }));
        break;
      }
      case EnumCardActions.Archive: {
        // dispatch(TodosActions.effect.update({
        //   id: todoId!,
        //   isArchived: !isArchived,
        // }));
        dispatch(TodosActions.effect.switchArchived({
          todoId,
        }));
        break;
      }
      case EnumCardActions.Delete: {
        // dispatch(TodosActions.effect.update({ id: todoId!, isRemoved: true }));
        dispatch(TodosActions.effect.switchRemoved({ todoId }));
        dispatch(TodosActions.remove({ id: todoId }));
        break;
      }
      case EnumCardActions.Restore: {
        // dispatch(TodosActions.effect.update({ id: todoId!, isRemoved: false }));
        dispatch(TodosActions.effect.switchRemoved({ todoId }));
        dispatch(TodosActions.remove({ id: todoId! }));
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
    dispatch(TodosActions.effect.update({
      id: todoId!,
      expirationDate: selectedDate,
    }));
  };

  const buttons = isRemovedCards ? [
    <MenuItem
      key={15}
      text={t('Restore')}
      imageSrc="/assets/svg/menu/restore.svg"
      action={EnumCardActions.Restore}
    />] : [<ColorPicker
      key={0}
      onPick={(newColor) => handleMenuButtonClick(EnumCardActions.ChangeColor, newColor)}
      activeColor={color}
    />,
      <MenuItem
        key={1}
        text={t('Edit card')}
        imageSrc="/assets/svg/menu/edit.svg"
        action={EnumCardActions.EditCard}
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
      <Submenu
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
          key={5}
          text={t('Mark as done')}
          imageSrc="/assets/svg/menu/rounded-square-check.svg"
          hintImageSrc={`${status === EnumTodoStatus.Done ? '/assets/svg/menu/tick.svg' : ''}`}
          isColoredHintImage
          action={EnumCardActions.CompleteStatus}
          payload={EnumTodoStatus.Done}
        />
        <MenuItem
          key={6}
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
      </Submenu>,
      <Divider
        key={7}
        verticalSpacer={7}
        horizontalSpacer={10}
      />,
      <MenuItem
        key={8}
        text={t('Notifications')}
        imageSrc="/assets/svg/menu/notifications.svg"
        hintImageSrc={`${isNotificationsEnabled ? '/assets/svg/menu/tick.svg' : ''}`}
        isColoredHintImage
        action={EnumCardActions.Notifications}
      />,
      <CopyToClipboard
        key={9}
        text={`verticals.xom9ik.com/${username}/${activeBoardReadableId}/card/${toReadableId(
          title, todoId,
        )}`} // TODO: move to env
        onCopy={() => {
          handleMenuButtonClick(EnumCardActions.CopyLink);
        }}
      >
        <MenuItem
          text={isCopied ? t('Copied!') : t('Copy link')}
          imageSrc="/assets/svg/menu/copy-link.svg"
          isAutoClose={false}
        />
      </CopyToClipboard>,
      <MenuItem
        key={10}
        text={t('Duplicate')}
        imageSrc="/assets/svg/menu/duplicate.svg"
        action={EnumCardActions.Duplicate}
      />,
      <Divider
        key={11}
        verticalSpacer={7}
        horizontalSpacer={10}
      />,
      <MenuItem
        key={12}
        text={t('Add card below')}
        imageSrc="/assets/svg/menu/add-card.svg"
        action={EnumCardActions.AddCardBelow}
      />,
      <Divider
        key={13}
        verticalSpacer={7}
        horizontalSpacer={10}
      />,
      <MenuItem
        key={14}
        text={isArchivedHeading ? t('Unarchive') : t('Archive')}
        imageSrc={`/assets/svg/menu/archive${isArchivedHeading ? '' : '-close'}.svg`}
        action={EnumCardActions.Archive}
      />,
      <MenuItem
        key={15}
        text={t('Delete')}
        imageSrc="/assets/svg/menu/remove.svg"
        hintText="⌫"
        action={EnumCardActions.Delete}
      />,
  ];

  return useMemo(() => (todoId && title ? (
    <Menu
      ref={menuButtonRef}
      id={`${menuId}-card-${todoId}`}
      imageSrc={`/assets/svg/dots${isPrimary ? '-primary' : ''}.svg`}
      alt="menu"
      imageSize={imageSize || 22}
      size={size || 24}
      isInvisible
      isColored={isColored}
      isInvertColor={isActive}
      isHoverBlock={isHover}
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
          ) : buttons
        }
    </Menu>
  ) : null),
  [isHover, color,
    isNotificationsEnabled,
    status, username, isCopied, isArchivedHeading, isRemovedCards,
    isOpenDatePicker, expirationDate]);
};
