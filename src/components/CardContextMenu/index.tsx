import React, { FC, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Menu } from '../Menu';
import { ColorPicker } from '../ColorPicker';
import { MenuButton } from '../MenuButton';
import { Submenu } from '../Submenu';
import { EnumTodoStatus } from '../../types';
import { Divider } from '../Divider';
import { TodosActions } from '../../store/actions';

interface ICardContextMenu {
  id?: string;
  isArchive?: boolean;
  isActive?: boolean;
  isHover: boolean;
  isNotificationsEnabled?: boolean;
  color?: number;
  size?: number;
  imageSize?: number;
  isPrimary?: boolean;
  onStartEdit: () => void;
  onChangeColor: (newColor: number) => void;
  onHidePopup: () => void;
}

enum EnumCardActions {
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
  isArchive,
  isActive,
  isHover,
  isNotificationsEnabled,
  color,
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
        dispatch(TodosActions.updateCompleteStatus(id!, payload));
        break;
      }
      case EnumCardActions.Notifications: {
        // TODO:
        dispatch(TodosActions.switchNotificationsEnabled(id!));
        break;
      }
      case EnumCardActions.CopyLink: {
        console.log('copy', `https://${id}`);
        break;
      }
      case EnumCardActions.Duplicate: {
        dispatch(TodosActions.duplicate(id!));
        break;
      }
      case EnumCardActions.AddCardBelow: {
        dispatch(TodosActions.removeNewTodo());
        dispatch(TodosActions.addTodoBelow(id!));
        break;
      }
      case EnumCardActions.Archive: {
        dispatch(TodosActions.setIsArchive(id!, !isArchive));
        break;
      }
      case EnumCardActions.Delete: {
        dispatch(TodosActions.remove(id!));
        break;
      }
      default: break;
    }
    onHidePopup();
  };

  const memoContextMenu = useMemo(() => (
    <Menu
      imageSrc={`/svg/dots${isPrimary ? '-primary' : ''}.svg`}
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
        onPick={(newColor: number) => {
          onHidePopup();
          onChangeColor(newColor);
        }}
        activeColor={color}
      />
      <MenuButton
        text="Edit card"
        imageSrc="/svg/menu/edit.svg"
        onClick={() => menuButtonClickHandler(EnumCardActions.EditCard)}
      />
      <MenuButton
        text="Attach file"
        imageSrc="/svg/menu/attach.svg"
        onClick={() => menuButtonClickHandler(EnumCardActions.AttachFile)}
      />
      <MenuButton
        text="Add date"
        imageSrc="/svg/menu/add-date.svg"
        onClick={() => menuButtonClickHandler(EnumCardActions.AddDate)}
      />
      <Submenu
        text="Complete"
        imageSrc="/svg/menu/complete.svg"
      >
        <MenuButton
          text="Mark as to do"
          imageSrc="/svg/menu/rounded-square.svg"
          onClick={() => menuButtonClickHandler(
            EnumCardActions.CompleteStatus, EnumTodoStatus.Todo,
          )}
        />
        <MenuButton
          text="Mark as doing"
          imageSrc="/svg/menu/rounded-square-half-filled.svg"
          onClick={() => menuButtonClickHandler(
            EnumCardActions.CompleteStatus, EnumTodoStatus.Doing,
          )}
        />
        <MenuButton
          text="Mark as done"
          imageSrc="/svg/menu/rounded-square-check.svg"
          onClick={() => menuButtonClickHandler(
            EnumCardActions.CompleteStatus, EnumTodoStatus.Done,
          )}
        />
      </Submenu>
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuButton
        text="Notifications"
        imageSrc="/svg/menu/notifications.svg"
        hintImageSrc={`${isNotificationsEnabled ? '/svg/menu/tick-active.svg' : ''}`}
        onClick={() => menuButtonClickHandler(EnumCardActions.Notifications)}
      />
      <MenuButton
        text="Copy link"
        imageSrc="/svg/menu/copy-link.svg"
        onClick={() => menuButtonClickHandler(EnumCardActions.CopyLink)}
      />
      <MenuButton
        text="Duplicate"
        imageSrc="/svg/menu/duplicate.svg"
        onClick={() => menuButtonClickHandler(EnumCardActions.Duplicate)}
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuButton
        text="Add card below"
        imageSrc="/svg/menu/add-card.svg"
        onClick={() => menuButtonClickHandler(EnumCardActions.AddCardBelow)}
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuButton
        text={isArchive ? 'Unarchive' : 'Archive'}
        imageSrc="/svg/menu/archive.svg"
        onClick={() => menuButtonClickHandler(EnumCardActions.Archive)}
      />
      <MenuButton
        text="Delete"
        imageSrc="/svg/menu/delete.svg"
        hintText="⌫"
        onClick={() => menuButtonClickHandler(EnumCardActions.Delete)}
      />
    </Menu>
  ), [isHover, color]);
  return (<>{memoContextMenu}</>);
};
