import React, { FC, useMemo } from 'react';
import { Menu } from '@comp/Menu';
import { ColorPicker } from '@comp/ColorPicker';
import { MenuItem } from '@comp/MenuItem';
import { Divider } from '@comp/Divider';
import { IColor } from '@type/entities';
import { ColumnsActions, SystemActions } from '@store/actions';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleColorPick = (newColor: IColor) => {
    dispatch(ColumnsActions.update({ id: columnId, color: newColor }));
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
  };

  return useMemo(() => (isEnabled ? (
    <Menu
      id={`column-${columnId}`}
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
      onSelect={handleMenuButtonClick}
    >
      <ColorPicker onPick={handleColorPick} activeColor={color} />
      <MenuItem
        text={t('Edit column')}
        imageSrc="/assets/svg/menu/edit.svg"
        action={EnumMenuActions.EditColumn}
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuItem
        text={t('Duplicate')}
        imageSrc="/assets/svg/menu/duplicate.svg"
        action={EnumMenuActions.Duplicate}
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuItem
        text={t('Add card')}
        imageSrc="/assets/svg/menu/add-card.svg"
        action={EnumMenuActions.AddCard}
      />
      <MenuItem
        text={t('Add heading')}
        imageSrc="/assets/svg/menu/add-heading.svg"
        action={EnumMenuActions.AddHeading}
      />
      <MenuItem
        text={t('Add column after')}
        imageSrc="/assets/svg/menu/add-column.svg"
        action={EnumMenuActions.AddColumnAfter}
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuItem
        text={t('Delete')}
        imageSrc="/assets/svg/menu/remove.svg"
        hintText="⌫"
        action={EnumMenuActions.Delete}
      />
    </Menu>
  ) : null),
  [t, columnId, isEnabled, isHide, isHover, color]);
};
