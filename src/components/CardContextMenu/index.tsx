import React, { FC, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Menu } from '@comp/Menu';
import { ColorPicker } from '@comp/ColorPicker';
import { MenuButton } from '@comp/MenuButton';
import { Submenu } from '@comp/Submenu';
import { EnumTodoStatus } from '@/types';
import { Divider } from '@comp/Divider';
import { SystemActions, TodosActions } from '@/store/actions';

interface ICardContextMenu {
  id?: number;
  columnId?: number;
  isArchive?: boolean;
  isActive?: boolean;
  isHover: boolean;
  isNotificationsEnabled?: boolean;
  color?: number;
  status?: EnumTodoStatus;
  size?: number;
  imageSize?: number;
  isPrimary?: boolean;
  onStartEdit: () => void;
  onChangeColor: (newColor: number) => void;
  onHidePopup?: () => void;
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
}

export const CardContextMenu: FC<ICardContextMenu> = ({
  id,
  columnId,
  isArchive,
  isActive,
  isHover,
  isNotificationsEnabled,
  color,
  status,
  size,
  imageSize,
  isPrimary,
  onStartEdit,
  onChangeColor,
  onHidePopup,
}) => {
  const dispatch = useDispatch();

  const menuButtonClickHandler = (action: EnumCardActions, payload?: any) => {
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
        // TODO:
        break;
      }
      case EnumCardActions.AddDate: {
        // TODO:
        break;
      }
      case EnumCardActions.CompleteStatus: {
        console.log('updateCompleteStatus', payload);
        // setStatus(payload);
        dispatch(TodosActions.updateCompleteStatus({
          id: id!,
          status: payload,
        }));
        break;
      }
      case EnumCardActions.Notifications: {
        // TODO:
        dispatch(TodosActions.switchNotificationsEnabled({ id: id! }));
        break;
      }
      case EnumCardActions.CopyLink: {
        console.log('copy', `https://${id}`);
        break;
      }
      case EnumCardActions.Duplicate: {
        dispatch(TodosActions.duplicate({ id: id! }));
        break;
      }
      case EnumCardActions.AddCardBelow: {
        dispatch(TodosActions.removeTemp());
        dispatch(TodosActions.drawBelow({
          belowId: id!,
          columnId: columnId!,
        }));
        break;
      }
      case EnumCardActions.Archive: {
        dispatch(TodosActions.updateIsArchive({
          id: id!,
          isArchive: !isArchive,
        }));
        break;
      }
      case EnumCardActions.Delete: {
        dispatch(TodosActions.remove({ id: id! }));
        break;
      }
      default: break;
    }
    dispatch(SystemActions.setIsOpenPopup(false));
    onHidePopup?.();
  };

  const memoContextMenu = useMemo(() => (
    <Menu
      imageSrc={`/assets/svg/dots${isPrimary ? '-primary' : ''}.svg`}
      alt="menu"
      imageSize={imageSize || 22}
      size={size || 24}
      isHide
      isInvertColor={isActive}
      isHoverBlock={isHover}
      position="right"
      style={{ marginTop: 5, marginRight: 8, marginBottom: 5 }}
    >
      <ColorPicker
        onPick={(newColor) => menuButtonClickHandler(EnumCardActions.ChangeColor, newColor)}
        activeColor={color}
      />
      <MenuButton
        text="Edit card"
        imageSrc="/assets/svg/menu/edit.svg"
        onClick={() => menuButtonClickHandler(EnumCardActions.EditCard)}
      />
      <MenuButton
        text="Attach file"
        imageSrc="/assets/svg/menu/attach.svg"
        onClick={() => menuButtonClickHandler(EnumCardActions.AttachFile)}
      />
      <MenuButton
        text="Add date"
        imageSrc="/assets/svg/menu/add-date.svg"
        onClick={() => menuButtonClickHandler(EnumCardActions.AddDate)}
      />
      <Submenu
        text="Complete"
        imageSrc="/assets/svg/menu/complete.svg"
      >
        <MenuButton
          text="Mark as to do"
          imageSrc="/assets/svg/menu/rounded-square.svg"
          hintImageSrc={`${status === EnumTodoStatus.Todo ? '/assets/svg/menu/tick-active.svg' : ''}`}
          onClick={() => menuButtonClickHandler(
            EnumCardActions.CompleteStatus, EnumTodoStatus.Todo,
          )}
        />
        <MenuButton
          text="Mark as doing"
          imageSrc="/assets/svg/menu/rounded-square-half-filled.svg"
          hintImageSrc={`${status === EnumTodoStatus.Doing ? '/assets/svg/menu/tick-active.svg' : ''}`}
          onClick={() => menuButtonClickHandler(
            EnumCardActions.CompleteStatus, EnumTodoStatus.Doing,
          )}
        />
        <MenuButton
          text="Mark as done"
          imageSrc="/assets/svg/menu/rounded-square-check.svg"
          hintImageSrc={`${status === EnumTodoStatus.Done ? '/assets/svg/menu/tick-active.svg' : ''}`}
          onClick={() => menuButtonClickHandler(
            EnumCardActions.CompleteStatus, EnumTodoStatus.Done,
          )}
        />
      </Submenu>
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuButton
        text="Notifications"
        imageSrc="/assets/svg/menu/notifications.svg"
        hintImageSrc={`${isNotificationsEnabled ? '/assets/svg/menu/tick-active.svg' : ''}`}
        onClick={() => menuButtonClickHandler(EnumCardActions.Notifications)}
      />
      <MenuButton
        text="Copy link"
        imageSrc="/assets/svg/menu/copy-link.svg"
        onClick={() => menuButtonClickHandler(EnumCardActions.CopyLink)}
      />
      <MenuButton
        text="Duplicate"
        imageSrc="/assets/svg/menu/duplicate.svg"
        onClick={() => menuButtonClickHandler(EnumCardActions.Duplicate)}
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuButton
        text="Add card below"
        imageSrc="/assets/svg/menu/add-card.svg"
        onClick={() => menuButtonClickHandler(EnumCardActions.AddCardBelow)}
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuButton
        text={isArchive ? 'Unarchive' : 'Archive'}
        imageSrc={`/assets/svg/menu/archive${isArchive ? '' : '-close'}.svg`}
        onClick={() => menuButtonClickHandler(EnumCardActions.Archive)}
      />
      <MenuButton
        text="Delete"
        imageSrc="/assets/svg/menu/remove.svg"
        hintText="⌫"
        onClick={() => menuButtonClickHandler(EnumCardActions.Delete)}
      />
    </Menu>
  ), [isHover, color, isNotificationsEnabled, isArchive, status]);
  return (<>{memoContextMenu}</>);
};
