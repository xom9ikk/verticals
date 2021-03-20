import React, { FC, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Menu } from '@comp/Menu';
import { MenuItem } from '@comp/MenuItem';
import { Divider } from '@comp/Divider';
import { ColorPicker } from '@comp/ColorPicker';
import { Submenu } from '@comp/Submenu';
import { ControlButton } from '@comp/ControlButton';
import { BoardsActions, ColumnsActions, SystemActions } from '@store/actions';
import { useReadableId } from '@use/readableId';
import { EnumTodoType, IColor } from '@type/entities';
import { getUsername } from '@store/selectors';
import { ICONS } from '@/constants';
import { useTranslation } from 'react-i18next';

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
      <Submenu
        text={t('Card style')}
        imageSrc="/assets/svg/menu/rect.svg"
      >
        <MenuItem
          text={t('Checkboxes')}
          imageSrc="/assets/svg/menu/square.svg"
          action={EnumMenuActions.CardStyle}
          payload={EnumTodoType.Checkboxes}
        />
        <MenuItem
          text={t('Arrows')}
          imageSrc="/assets/svg/menu/arrow.svg"
          action={EnumMenuActions.CardStyle}
          payload={EnumTodoType.Arrows}
        />
        <MenuItem
          text={t('Dots')}
          imageSrc="/assets/svg/menu/circle.svg"
          action={EnumMenuActions.CardStyle}
          payload={EnumTodoType.Dots}
        />
        <MenuItem
          text={t('Dashes')}
          imageSrc="/assets/svg/menu/dash.svg"
          action={EnumMenuActions.CardStyle}
          payload={EnumTodoType.Dashes}
        />
        <MenuItem
          text={t('Nothing')}
          action={EnumMenuActions.CardStyle}
          payload={EnumTodoType.Nothing}
        />
      </Submenu>
      <Submenu
        text={t('Icon')}
        imageSrc="/assets/svg/menu/icon.svg"
      >
        <div className="menu-item__icons-container">
          {
            ICONS.map((filename) => {
              const link = `/assets/svg/board/${filename}.svg`;
              return (
                <ControlButton
                  key={filename}
                  imageSrc={link}
                  alt={filename}
                  imageSize={24}
                  size={36}
                  onClick={() => {
                    dispatch(BoardsActions.effect.update({ id: boardId, icon: link }));
                  }}
                />
              );
            })
          }
        </div>
      </Submenu>
      <MenuItem
        text={t('Reverse column order')}
        imageSrc="/assets/svg/menu/reverse.svg"
        action={EnumMenuActions.ReverseColumnOrder}
      />
      <CopyToClipboard
        text={`verticals.xom9ik.com/${username}/${toReadableId(title, boardId!)}`} // TODO: move to env
        onCopy={() => {
          handleMenuButtonClick(EnumMenuActions.CopyLink);
        }}
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
