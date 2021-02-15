import React, { FC, useMemo } from 'react';
import { Menu } from '@comp/Menu';
import { ColorPicker } from '@comp/ColorPicker';
import { MenuItem } from '@comp/MenuItem';
import { Divider } from '@comp/Divider';
import { IColor } from '@type/entities';
import { ColumnsActions, SystemActions } from '@store/actions';
import { useDispatch } from 'react-redux';

interface IColumnContextMenu {
  isEnabled?: boolean;
  columnId: number;
  boardId: number;
  color?: IColor;
  isHide: boolean;
  isHover: boolean;
  onAddCard: () => void;
}

enum EnumMenuActions {
  EditColumn,
  Duplicate,
  AddCard,
  AddHeading,
  AddColumnAfter,
  Delete,
}

export const ColumnContextMenu: FC<IColumnContextMenu> = ({
  isEnabled = true,
  columnId,
  boardId,
  color,
  isHide,
  isHover,
  onAddCard,
}) => {
  const dispatch = useDispatch();

  const handleColorPick = (newColor: IColor) => {
    dispatch(ColumnsActions.update({
      id: columnId,
      color: newColor,
    }));
  };

  const handleMenuButtonClick = (action: EnumMenuActions) => {
    switch (action) {
      case EnumMenuActions.EditColumn: {
        dispatch(SystemActions.setEditableColumnId(columnId));
        break;
      }
      case EnumMenuActions.Duplicate: {
        dispatch(ColumnsActions.duplicate({
          columnId: columnId!,
        }));
        break;
      }
      case EnumMenuActions.AddCard: {
        onAddCard();
        break;
      }
      case EnumMenuActions.AddHeading: {
        // TODO:
        break;
      }
      case EnumMenuActions.AddColumnAfter: {
        dispatch(ColumnsActions.removeTemp());
        dispatch(ColumnsActions.drawBelow({
          belowId: columnId,
          boardId: boardId!,
        }));
        break;
      }
      case EnumMenuActions.Delete: {
        dispatch(ColumnsActions.remove({ id: columnId }));
        break;
      }
      default: break;
    }
    dispatch(SystemActions.setIsOpenPopup(false));
  };

  return useMemo(() => (isEnabled ? (
    <Menu
      imageSrc="/assets/svg/dots.svg"
      alt="menu"
      imageSize={22}
      size={24}
      isInvisible
      position="bottom"
      isHide={isHide}
      isHoverBlock={isHover}
      style={{
        position: 'absolute',
        top: 23,
        right: 10,
      }}
    >
      <ColorPicker onPick={handleColorPick} activeColor={color} />
      <MenuItem
        text="Edit column"
        imageSrc="/assets/svg/menu/edit.svg"
        onClick={() => handleMenuButtonClick(EnumMenuActions.EditColumn)}
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuItem
        text="Duplicate"
        imageSrc="/assets/svg/menu/duplicate.svg"
        onClick={() => handleMenuButtonClick(EnumMenuActions.Duplicate)}
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuItem
        text="Add card"
        imageSrc="/assets/svg/menu/add-card.svg"
        onClick={() => handleMenuButtonClick(EnumMenuActions.AddCard)}
      />
      <MenuItem
        text="Add heading"
        imageSrc="/assets/svg/menu/add-heading.svg"
        onClick={() => handleMenuButtonClick(EnumMenuActions.AddHeading)}
      />
      <MenuItem
        text="Add column after"
        imageSrc="/assets/svg/menu/add-column.svg"
        onClick={() => handleMenuButtonClick(EnumMenuActions.AddColumnAfter)}
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuItem
        text="Delete"
        imageSrc="/assets/svg/menu/remove.svg"
        hintText="⌫"
        onClick={() => handleMenuButtonClick(EnumMenuActions.Delete)}
      />
    </Menu>
  ) : null),
  [isEnabled, isHide, isHover, color]);
};
