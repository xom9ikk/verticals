import React, { FC, useMemo } from 'react';
import { Menu } from '@comp/Menu';
import { ColorPicker } from '@comp/ColorPicker';
import { MenuItem } from '@comp/MenuItem';
import { Divider } from '@comp/Divider';
import { IColor } from '@type/entities';
import { HeadingsActions, SystemActions } from '@store/actions';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

interface IHeadingContextMenu {
  isEnabled?: boolean;
  headingId: number;
  color?: IColor;
  isHide: boolean;
  onAddCard: () => void;
}

enum EnumMenuActions {
  Edit,
  Duplicate,
  AddCard,
  Delete,
}

export const HeadingContextMenu: FC<IHeadingContextMenu> = ({
  isEnabled = true,
  headingId,
  color,
  isHide,
  onAddCard,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleColorPick = (newColor: IColor) => {
    dispatch(HeadingsActions.effect.update({ id: headingId, color: newColor }));
  };

  const handleMenuButtonClick = (action: EnumMenuActions) => {
    switch (action) {
      case EnumMenuActions.Edit: {
        dispatch(SystemActions.setEditableHeadingId(headingId));
        break;
      }
      case EnumMenuActions.Duplicate: {
        dispatch(HeadingsActions.effect.duplicate({
          headingId: headingId!,
        }));
        break;
      }
      case EnumMenuActions.AddCard: {
        onAddCard();
        break;
      }
      case EnumMenuActions.Delete: {
        dispatch(HeadingsActions.effect.remove({ id: headingId }));
        break;
      }
      default: break;
    }
  };

  return useMemo(() => (isEnabled ? (
    <Menu
      id={`heading-${headingId}`}
      buttonClassName="heading-context-menu"
      imageSrc="/assets/svg/dots.svg"
      alt="menu"
      imageSize={22}
      size={24}
      isInvisible
      position="bottom"
      isHide={isHide}
      style={{
        position: 'absolute',
        top: 7,
        right: 6,
      }}
      onSelect={handleMenuButtonClick}
    >
      <ColorPicker onPick={handleColorPick} activeColor={color} />
      <MenuItem
        text={t('Edit heading')}
        imageSrc="/assets/svg/menu/edit.svg"
        action={EnumMenuActions.Edit}
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
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuItem
        text={t('Delete')}
        imageSrc="/assets/svg/menu/remove.svg"
        hintText="⌫"
        action={EnumMenuActions.Delete}
      />
    </Menu>
  ) : null),
  [t, headingId, isEnabled, isHide, color]);
};
