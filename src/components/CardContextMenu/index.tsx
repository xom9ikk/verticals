import React, {
  FC, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from '@comp/Menu';
import { ColorPicker } from '@comp/ColorPicker';
import { MenuItem } from '@comp/MenuItem';
import { Submenu } from '@comp/Submenu';
import { EnumTodoStatus, IColor } from '@type/entities';
import { Divider } from '@comp/Divider';
import { CommentsActions, SystemActions, TodosActions } from '@store/actions';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useReadableId } from '@use/readableId';
import { getActiveBoardReadableId, getUsername } from '@store/selectors';
import { useOpenFiles } from '@use/openFiles';
import { DatePicker } from '@comp/DatePicker';

interface ICardContextMenu {
  menuId: string;
  todoId?: number;
  title?: string;
  columnId: number;
  isArchived?: boolean;
  isActive?: boolean;
  isHover: boolean;
  isNotificationsEnabled?: boolean;
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
}

export const CardContextMenu: FC<ICardContextMenu> = ({
  menuId,
  todoId,
  title,
  columnId,
  isArchived,
  isActive,
  isHover,
  isNotificationsEnabled,
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
  const dispatch = useDispatch();
  const { toReadableId } = useReadableId();
  const { openFiles } = useOpenFiles();

  const username = useSelector(getUsername);
  const activeBoardReadableId = useSelector(getActiveBoardReadableId);

  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isOpenDatePicker, setIsOpenDatePicker] = useState<boolean>(false);

  const menuButtonRef = useRef<any>();

  const handleUploadFiles = async () => {
    const openedFiles = await openFiles('*', true);
    dispatch(CommentsActions.create({
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
        // TODO:
        break;
      }
      case EnumCardActions.AddDate: {
        // TODO:
        setIsOpenDatePicker(true);
        break;
      }
      case EnumCardActions.CompleteStatus: {
        dispatch(TodosActions.update({
          id: todoId!,
          status: payload,
        }));
        break;
      }
      case EnumCardActions.Notifications: {
        dispatch(TodosActions.update({
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
        dispatch(TodosActions.duplicate({ todoId: todoId! }));
        break;
      }
      case EnumCardActions.AddCardBelow: {
        dispatch(TodosActions.removeTemp());
        console.log('add below', columnId, todoId);
        dispatch(TodosActions.drawBelow({
          belowId: todoId!,
          columnId: columnId!,
        }));
        break;
      }
      case EnumCardActions.Archive: {
        dispatch(TodosActions.update({
          id: todoId!,
          isArchived: !isArchived,
        }));
        break;
      }
      case EnumCardActions.Delete: {
        dispatch(TodosActions.remove({ id: todoId! }));
        break;
      }
      default: break;
    }
  };

  const handleSelectDate = (date?: Date) => {
    console.log(date);
    setIsOpenDatePicker(false);
  };

  return useMemo(() => (todoId && title ? (

    <>
      <DatePicker
        isOpen={isOpenDatePicker}
        position="right"
        sourceRef={menuButtonRef}
        onSelectDate={handleSelectDate}
      />
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
        onSelect={handleMenuButtonClick}
      >
        <ColorPicker
          onPick={(newColor) => handleMenuButtonClick(EnumCardActions.ChangeColor, newColor)}
          activeColor={color}
        />
        <MenuItem
          text="Edit card"
          imageSrc="/assets/svg/menu/edit.svg"
          action={EnumCardActions.EditCard}
        />
        <MenuItem
          text="Attach file"
          imageSrc="/assets/svg/menu/attach.svg"
          action={EnumCardActions.AttachFile}
        />
        <MenuItem
          text="Add date"
          imageSrc="/assets/svg/menu/add-date.svg"
          action={EnumCardActions.AddDate}
        />
        <Submenu
          text="Complete"
          imageSrc="/assets/svg/menu/complete.svg"
        >
          <MenuItem
            text="Mark as to do"
            imageSrc="/assets/svg/menu/rounded-square.svg"
            hintImageSrc={`${status === EnumTodoStatus.Todo ? '/assets/svg/menu/tick.svg' : ''}`}
            isColoredHintImage
            action={EnumCardActions.CompleteStatus}
            payload={EnumTodoStatus.Todo}
          />
          <MenuItem
            text="Mark as doing"
            imageSrc="/assets/svg/menu/rounded-square-half-filled.svg"
            hintImageSrc={`${status === EnumTodoStatus.Doing ? '/assets/svg/menu/tick.svg' : ''}`}
            isColoredHintImage
            action={EnumCardActions.CompleteStatus}
            payload={EnumTodoStatus.Doing}
          >
            <span>Alt</span>
            +
            <span>Click</span>
            on a checkbox to mark as doing
          </MenuItem>
          <MenuItem
            text="Mark as done"
            imageSrc="/assets/svg/menu/rounded-square-check.svg"
            hintImageSrc={`${status === EnumTodoStatus.Done ? '/assets/svg/menu/tick.svg' : ''}`}
            isColoredHintImage
            action={EnumCardActions.CompleteStatus}
            payload={EnumTodoStatus.Done}
          />
          <MenuItem
            text="Mark as canceled"
            imageSrc="/assets/svg/menu/rounded-square-canceled.svg"
            hintImageSrc={`${status === EnumTodoStatus.Canceled ? '/assets/svg/menu/tick.svg' : ''}`}
            isColoredHintImage
            action={EnumCardActions.CompleteStatus}
            payload={EnumTodoStatus.Canceled}
          >
            <span>Shift</span>
            +
            <span>Click</span>
            on a checkbox to mark as canceled
          </MenuItem>
        </Submenu>
        <Divider verticalSpacer={7} horizontalSpacer={10} />
        <MenuItem
          text="Notifications"
          imageSrc="/assets/svg/menu/notifications.svg"
          hintImageSrc={`${isNotificationsEnabled ? '/assets/svg/menu/tick.svg' : ''}`}
          isColoredHintImage
          action={EnumCardActions.Notifications}
        />
        <CopyToClipboard
          text={`verticals.xom9ik.com/${username}/${activeBoardReadableId}/card/${toReadableId(
            title, todoId,
          )}`} // TODO: move to env
          onCopy={() => {
            handleMenuButtonClick(EnumCardActions.CopyLink);
          }}
        >
          <MenuItem
            text={isCopied ? 'Copied!' : 'Copy link'}
            imageSrc="/assets/svg/menu/copy-link.svg"
            isAutoClose={false}
          />
        </CopyToClipboard>
        <MenuItem
          text="Duplicate"
          imageSrc="/assets/svg/menu/duplicate.svg"
          action={EnumCardActions.Duplicate}
        />
        <Divider verticalSpacer={7} horizontalSpacer={10} />
        <MenuItem
          text="Add card below"
          imageSrc="/assets/svg/menu/add-card.svg"
          action={EnumCardActions.AddCardBelow}
        />
        <Divider verticalSpacer={7} horizontalSpacer={10} />
        <MenuItem
          text={isArchived ? 'Unarchive' : 'Archive'}
          imageSrc={`/assets/svg/menu/archive${isArchived ? '' : '-close'}.svg`}
          action={EnumCardActions.Archive}
        />
        <MenuItem
          text="Delete"
          imageSrc="/assets/svg/menu/remove.svg"
          hintText="⌫"
          action={EnumCardActions.Delete}
        />
      </Menu>
    </>
  ) : null),
  [isHover, color,
    isNotificationsEnabled,
    isArchived, status, username, isCopied, isOpenDatePicker]);
};
