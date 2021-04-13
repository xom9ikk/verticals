import React, { FC, useMemo, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { ICONS } from '@/constants';
import { ColorPicker } from '@comp/ColorPicker';
import { ControlButton } from '@comp/ControlButton';
import { Divider } from '@comp/Divider';
import { Menu } from '@comp/Menu';
import { MenuItem } from '@comp/Menu/Item';
import { SubMenu } from '@comp/Menu/Sub';
import { ColumnsActions, BoardsActions, SystemActions } from '@store/actions';
import { getUsername } from '@store/selectors';
import { EnumCardType, IColor } from '@type/entities';
import { useHostname } from '@use/hostname';
import { useReadableId } from '@use/readableId';

interface IBoardContextMenu {
  boardId: number;
  title: string;
  color?: IColor;
  isActive: boolean;
}

enum EnumMenuActions {
  EditBoard,
  CardStyle,
  ReverseColumnOrder,
  CopyLink,
  AddBoardBelow,
  Delete,
}

export const BoardContextMenu: FC<IBoardContextMenu> = ({
  boardId,
  title,
  color,
  isActive,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { toReadableId } = useReadableId();
  const hostname = useHostname();

  const [isCopied, setIsCopied] = useState<boolean>(false);

  const username = useSelector(getUsername);

  const handleColorPick = (newColor: IColor) => {
    dispatch(BoardsActions.effect.update({ id: boardId, color: newColor }));
  };

  const handleMenuButtonClick = (action: EnumMenuActions, payload?: any) => {
    switch (action) {
      case EnumMenuActions.EditBoard: {
        dispatch(SystemActions.setEditableBoardId(boardId));
        break;
      }
      case EnumMenuActions.CardStyle: {
        dispatch(BoardsActions.effect.update({ id: boardId, cardType: payload }));
        break;
      }
      case EnumMenuActions.ReverseColumnOrder: {
        dispatch(ColumnsActions.effect.reverseOrder({ boardId }));
        break;
      }
      case EnumMenuActions.CopyLink: {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
          dispatch(SystemActions.setActivePopupId(null));
        }, 1000);
        return;
      }
      case EnumMenuActions.AddBoardBelow: {
        dispatch(BoardsActions.removeTemp());
        dispatch(BoardsActions.drawBelow({ belowId: boardId }));
        break;
      }
      case EnumMenuActions.Delete: {
        dispatch(BoardsActions.effect.remove({ id: boardId }));
        break;
      }
      default: break;
    }
  };

  const handleCopy = () => {
    handleMenuButtonClick(EnumMenuActions.CopyLink);
  };

  return useMemo(() => (
    <Menu
      onSelect={handleMenuButtonClick}
      id={`board-${boardId}`}
      imageSrc="/assets/svg/dots.svg"
      alt="menu"
      imageSize={22}
      size={24}
      isInvisible
      style={{
        position: 'absolute',
        right: 6,
      }}
      position="right"
      isAbsolute={false}
      isInvertColor={isActive}
    >
      <ColorPicker onPick={handleColorPick} activeColor={color} />
      <MenuItem
        text={t('Edit board')}
        imageSrc="/assets/svg/menu/edit.svg"
        hintText="E"
        action={EnumMenuActions.EditBoard}
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <SubMenu
        text={t('Card style')}
        imageSrc="/assets/svg/menu/rect.svg"
      >
        <MenuItem
          text={t('Checkboxes')}
          imageSrc="/assets/svg/menu/square.svg"
          action={EnumMenuActions.CardStyle}
          payload={EnumCardType.Checkboxes}
        />
        <MenuItem
          text={t('Arrows')}
          imageSrc="/assets/svg/menu/arrow.svg"
          action={EnumMenuActions.CardStyle}
          payload={EnumCardType.Arrows}
        />
        <MenuItem
          text={t('Dots')}
          imageSrc="/assets/svg/menu/circle.svg"
          action={EnumMenuActions.CardStyle}
          payload={EnumCardType.Dots}
        />
        <MenuItem
          text={t('Dashes')}
          imageSrc="/assets/svg/menu/dash.svg"
          action={EnumMenuActions.CardStyle}
          payload={EnumCardType.Dashes}
        />
        <MenuItem
          text={t('Nothing')}
          action={EnumMenuActions.CardStyle}
          payload={EnumCardType.Nothing}
        />
      </SubMenu>
      <SubMenu
        text={t('Icon')}
        imageSrc="/assets/svg/menu/icon.svg"
      >
        <div className="menu-item__icons-container">
          {
            ICONS.map((filename) => {
              const link = `/assets/svg/board/${filename}.svg`;
              const handleClick = () => {
                dispatch(BoardsActions.effect.update({ id: boardId, icon: link }));
              };

              return (
                <ControlButton
                  key={filename}
                  imageSrc={link}
                  alt={filename}
                  imageSize={24}
                  size={36}
                  onClick={handleClick}
                />
              );
            })
          }
        </div>
      </SubMenu>
      <MenuItem
        text={t('Reverse column order')}
        imageSrc="/assets/svg/menu/reverse.svg"
        action={EnumMenuActions.ReverseColumnOrder}
      />
      <CopyToClipboard
        text={`${hostname}/${username}/${toReadableId(title, boardId!)}`}
        onCopy={handleCopy}
      >
        <MenuItem
          text={isCopied ? t('Copied!') : t('Copy link')}
          imageSrc="/assets/svg/menu/copy-link.svg"
          isAutoClose={false}
        />
      </CopyToClipboard>
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuItem
        text={t('Add board below')}
        imageSrc="/assets/svg/menu/add-board.svg"
        action={EnumMenuActions.AddBoardBelow}
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuItem
        text={t('Delete')}
        imageSrc="/assets/svg/menu/remove.svg"
        hintText="⌫"
        action={EnumMenuActions.Delete}
      />
    </Menu>
  ), [t, boardId, isActive, color, username, isCopied]);
};
