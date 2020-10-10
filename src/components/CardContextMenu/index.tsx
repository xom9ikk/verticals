import React, { FC, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from '@comp/Menu';
import { ColorPicker } from '@comp/ColorPicker';
import { MenuButton } from '@comp/MenuButton';
import { Submenu } from '@comp/Submenu';
import { EnumColors, EnumTodoStatus } from '@/types/entities';
import { Divider } from '@comp/Divider';
import { SystemActions, TodosActions } from '@/store/actions';
import CopyToClipboard from 'react-copy-to-clipboard';
import { IRootState } from '@/store/reducers/state';
import { useReadableId } from '@/use/readableId';

interface ICardContextMenu {
  id?: number;
  title?: string;
  columnId?: number;
  isArchived?: boolean;
  isActive?: boolean;
  isHover: boolean;
  isNotificationsEnabled?: boolean;
  color?: EnumColors;
  status?: EnumTodoStatus;
  size?: number;
  imageSize?: number;
  isPrimary?: boolean;
  isColored?: boolean;
  onStartEdit: () => void;
  onChangeColor: (newColor: EnumColors) => void;
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
  onHidePopup,
}) => {
  const dispatch = useDispatch();
  const { toReadableId } = useReadableId();

  const {
    system: {
      activeBoardReadableId,
    },
  } = useSelector((state: IRootState) => state);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const hidePopup = () => {
    dispatch(SystemActions.setIsOpenPopup(false));
    onHidePopup?.();
  };

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
        dispatch(TodosActions.updateCompleteStatus({
          id: id!,
          status: payload,
        }));
        break;
      }
      case EnumCardActions.Notifications: {
        dispatch(TodosActions.updateNotificationEnabled({
          id: id!,
          isNotificationsEnabled: !isNotificationsEnabled,
        }));
        break;
      }
      case EnumCardActions.CopyLink: {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
          hidePopup();
        }, 1000);
        return;
      }
      case EnumCardActions.Duplicate: {
        dispatch(TodosActions.duplicate({ todoId: id! }));
        break;
      }
      case EnumCardActions.AddCardBelow: {
        dispatch(TodosActions.removeTemp());
        console.log('add below', columnId, id);
        dispatch(TodosActions.drawBelow({
          belowId: id!,
          columnId: columnId!,
        }));
        break;
      }
      case EnumCardActions.Archive: {
        dispatch(TodosActions.updateIsArchive({
          id: id!,
          isArchived: !isArchived,
        }));
        break;
      }
      case EnumCardActions.Delete: {
        dispatch(TodosActions.remove({ id: id! }));
        break;
      }
      default: break;
    }
    hidePopup();
  };

  const memoMenu = useMemo(() => {
    if (id && title) {
      return (
        <Menu
          imageSrc={`/assets/svg/dots${isPrimary ? '-primary' : ''}.svg`}
          alt="menu"
          imageSize={imageSize || 22}
          size={size || 24}
          isHide
          isColored={isColored}
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
              hintImageSrc={`${status === EnumTodoStatus.Todo ? '/assets/svg/menu/tick.svg' : ''}`}
              isColoredHintImage
              onClick={() => menuButtonClickHandler(
                EnumCardActions.CompleteStatus, EnumTodoStatus.Todo,
              )}
            />
            <MenuButton
              text="Mark as doing"
              imageSrc="/assets/svg/menu/rounded-square-half-filled.svg"
              hintImageSrc={`${status === EnumTodoStatus.Doing ? '/assets/svg/menu/tick.svg' : ''}`}
              isColoredHintImage
              onClick={() => menuButtonClickHandler(
                EnumCardActions.CompleteStatus, EnumTodoStatus.Doing,
              )}
            >
              <span>Alt</span>
              +
              <span>Click</span>
              on a checkbox to mark as doing
            </MenuButton>
            <MenuButton
              text="Mark as done"
              imageSrc="/assets/svg/menu/rounded-square-check.svg"
              hintImageSrc={`${status === EnumTodoStatus.Done ? '/assets/svg/menu/tick.svg' : ''}`}
              isColoredHintImage
              onClick={() => menuButtonClickHandler(
                EnumCardActions.CompleteStatus, EnumTodoStatus.Done,
              )}
            />
            <MenuButton
              text="Mark as canceled"
              imageSrc="/assets/svg/menu/rounded-square-canceled.svg"
              hintImageSrc={`${status === EnumTodoStatus.Canceled ? '/assets/svg/menu/tick.svg' : ''}`}
              isColoredHintImage
              onClick={() => menuButtonClickHandler(
                EnumCardActions.CompleteStatus, EnumTodoStatus.Canceled,
              )}
            >
              <span>Shift</span>
              +
              <span>Click</span>
              on a checkbox to mark as canceled
            </MenuButton>
          </Submenu>
          <Divider verticalSpacer={7} horizontalSpacer={10} />
          <MenuButton
            text="Notifications"
            imageSrc="/assets/svg/menu/notifications.svg"
            hintImageSrc={`${isNotificationsEnabled ? '/assets/svg/menu/tick.svg' : ''}`}
            isColoredHintImage
            onClick={() => menuButtonClickHandler(EnumCardActions.Notifications)}
          />
          <CopyToClipboard
            text={`verticals.xom9ik.com/userId/${activeBoardReadableId}/card/${toReadableId(title, id!)}`}
            onCopy={() => {
              menuButtonClickHandler(EnumCardActions.CopyLink);
            }}
          >
            <MenuButton
              text={isCopied ? 'Copied!' : 'Copy link'}
              imageSrc="/assets/svg/menu/copy-link.svg"
            />
          </CopyToClipboard>
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
            text={isArchived ? 'Unarchive' : 'Archive'}
            imageSrc={`/assets/svg/menu/archive${isArchived ? '' : '-close'}.svg`}
            onClick={() => menuButtonClickHandler(EnumCardActions.Archive)}
          />
          <MenuButton
            text="Delete"
            imageSrc="/assets/svg/menu/remove.svg"
            hintText="⌫"
            onClick={() => menuButtonClickHandler(EnumCardActions.Delete)}
          />
        </Menu>
      );
    }
  },
  [isHover, color,
    isNotificationsEnabled,
    isArchived, status, isCopied]);

  return (
    <>
      {memoMenu}
    </>
  );
};
