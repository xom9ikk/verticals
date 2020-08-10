import React, { FC, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { icons } from '@/icons';
import { Menu } from '@comp/Menu';
import { ColorPicker } from '@comp/ColorPicker';
import { MenuButton } from '@comp/MenuButton';
import { Submenu } from '@comp/Submenu';
import { EnumTodoStatus } from '@/types';
import { Divider } from '@comp/Divider';
import { SystemActions, TodosActions } from '@/store/actions';

interface ICardContextMenu {
  id?: string;
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
        dispatch(TodosActions.removeNewTodo());
        dispatch(TodosActions.addTodoBelow({ id: id! }));
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
      imageSrc={isPrimary ? icons.dotsPrimary : icons.dots}
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
        imageSrc={icons.menu.edit}
        onClick={() => menuButtonClickHandler(EnumCardActions.EditCard)}
      />
      <MenuButton
        text="Attach file"
        imageSrc={icons.menu.attach}
        onClick={() => menuButtonClickHandler(EnumCardActions.AttachFile)}
      />
      <MenuButton
        text="Add date"
        imageSrc={icons.menu.addDate}
        onClick={() => menuButtonClickHandler(EnumCardActions.AddDate)}
      />
      <Submenu
        text="Complete"
        imageSrc={icons.menu.complete}
      >
        <MenuButton
          text="Mark as to do"
          imageSrc={icons.menu.roundedSquare}
          hintImageSrc={`${status === EnumTodoStatus.Todo ? icons.menu.tickActive : ''}`}
          onClick={() => menuButtonClickHandler(
            EnumCardActions.CompleteStatus, EnumTodoStatus.Todo,
          )}
        />
        <MenuButton
          text="Mark as doing"
          imageSrc={icons.menu.roundedSquareHalfFilled}
          hintImageSrc={`${status === EnumTodoStatus.Doing ? icons.menu.tickActive : ''}`}
          onClick={() => menuButtonClickHandler(
            EnumCardActions.CompleteStatus, EnumTodoStatus.Doing,
          )}
        />
        <MenuButton
          text="Mark as done"
          imageSrc={icons.menu.roundedSquareCheck}
          hintImageSrc={`${status === EnumTodoStatus.Done ? icons.menu.tickActive : ''}`}
          onClick={() => menuButtonClickHandler(
            EnumCardActions.CompleteStatus, EnumTodoStatus.Done,
          )}
        />
      </Submenu>
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuButton
        text="Notifications"
        imageSrc={icons.menu.notifications}
        hintImageSrc={`${isNotificationsEnabled ? icons.menu.tickActive : ''}`}
        onClick={() => menuButtonClickHandler(EnumCardActions.Notifications)}
      />
      <MenuButton
        text="Copy link"
        imageSrc={icons.menu.copyLink}
        onClick={() => menuButtonClickHandler(EnumCardActions.CopyLink)}
      />
      <MenuButton
        text="Duplicate"
        imageSrc={icons.menu.duplicate}
        onClick={() => menuButtonClickHandler(EnumCardActions.Duplicate)}
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuButton
        text="Add card below"
        imageSrc={icons.menu.addCard}
        onClick={() => menuButtonClickHandler(EnumCardActions.AddCardBelow)}
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuButton
        text={isArchive ? 'Unarchive' : 'Archive'}
        imageSrc={isArchive ? icons.menu.archive : icons.menu.archiveClose}
        onClick={() => menuButtonClickHandler(EnumCardActions.Archive)}
      />
      <MenuButton
        text="Delete"
        imageSrc={icons.menu.remove}
        hintText="⌫"
        onClick={() => menuButtonClickHandler(EnumCardActions.Delete)}
      />
    </Menu>
  ), [isHover, color, isNotificationsEnabled, isArchive, status]);
  return (<>{memoContextMenu}</>);
};
