import React, {
  FC, useEffect, useMemo, useRef, useState,
} from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { DraggableStateSnapshot } from 'react-beautiful-dnd';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Menu } from '@comp/Menu';
import { MenuItem } from '@comp/MenuItem';
import { Divider } from '@comp/Divider';
import { ColorPicker } from '@comp/ColorPicker';
import { Submenu } from '@comp/Submenu';
import { TextArea } from '@comp/TextArea';
import { RoundedButton } from '@comp/RoundedButton';
import { ControlButton } from '@comp/ControlButton';
import { BoardsActions, ColumnsActions, SystemActions } from '@/store/actions';
import { useClickPreventionOnDoubleClick } from '@/use/clickPreventionOnDoubleClick';
import { useFocus } from '@/use/focus';
import { useShiftEnterRestriction } from '@/use/shiftEnterRestriction';
import { useReadableId } from '@/use/readableId';
import { EnumColors, EnumTodoType } from '@/types/entities';
import {
  getCountTodosByBoardId,
  getIsEditableBoard, getIsSearchMode,
  getUsername,
} from '@/store/selectors';
import { ICONS } from '@/constants';

export interface IExitFromEditable {
  boardId: number,
  title?: string,
  description?: string,
  color?: EnumColors,
  belowId?: number,
}

interface IBoard {
  id?: number;
  snapshot?: DraggableStateSnapshot,
  belowId?: number;
  icon: string;
  color?: EnumColors;
  title?: string;
  isActive?: boolean;
  description?: string;
  isEditableDefault?: boolean;
  onExitFromEditable?: ({
    boardId,
    title,
    description,
    color,
    belowId,
  }: IExitFromEditable) => void;
  onClick?: (title: string, id: number) => void;
}

enum EnumMenuActions {
  EditBoard,
  CardStyle,
  ReverseColumnOrder,
  CopyLink,
  AddBoardBelow,
  Delete,
}

export const Board: FC<IBoard> = ({
  id = 0,
  snapshot,
  belowId,
  icon,
  color,
  title: initialTitle = '',
  description: initialDescription = '',
  isEditableDefault,
  onExitFromEditable,
  isActive = false,
  onClick,
}) => {
  const dispatch = useDispatch();
  const { focus } = useFocus();
  const { toReadableId } = useReadableId();
  const { shiftEnterRestriction } = useShiftEnterRestriction();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isMenuClick, setIsMenuClick] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isDoubleClicked, setIsDoubleClicked] = useState<boolean>();
  const [titleValue, setTitleValue] = useState<string | undefined>(initialTitle);
  const [descriptionValue, setDescriptionValue] = useState<string | undefined>(initialDescription);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const isEditableBoard = useSelector(getIsEditableBoard);
  const username = useSelector(getUsername);
  const isSearchMode = useSelector(getIsSearchMode);
  const countTodos = useSelector(getCountTodosByBoardId(id));

  const titleInputRef = useRef<any>(null);
  const descriptionInputRef = useRef<any>(null);

  const getNewData = () => ({
    newTitle: initialTitle !== titleValue
      ? titleValue?.trim()
      : undefined,
    newDescription: initialDescription !== descriptionValue
      ? descriptionValue?.trim()
      : undefined,
  });

  const hidePopup = () => {
    dispatch(SystemActions.setIsOpenPopup(false));
    setIsHover(false);
  };

  const saveBoard = (newColor?: EnumColors) => {
    const { newTitle, newDescription } = getNewData();
    onExitFromEditable?.({
      boardId: id!,
      title: newTitle,
      description: newDescription,
      color: newColor,
      belowId,
    });
    hidePopup();
  };

  const colorPickHandler = (newColor: EnumColors) => {
    dispatch(SystemActions.setIsOpenPopup(false));
    saveBoard(newColor);
  };

  useEffect(() => {
    focus(titleInputRef);
  }, [isEditable]);

  const keyDownHandler = (event: any) => {
    const {
      key, ctrlKey, shiftKey,
    } = event;
    if (key === 'Enter' && !ctrlKey && !shiftKey) {
      setIsEditable(false);
      saveBoard();
    }
  };

  const changeHandler = (event: any, isDescription: boolean) => {
    const { value } = event.target;
    return isDescription
      ? setDescriptionValue(value)
      : setTitleValue(value);
  };

  useEffect(() => {
    if (isDoubleClicked) {
      setIsDoubleClicked(false);
      dispatch(SystemActions.setIsEditableBoard(true));
      if (!isEditableBoard && isDoubleClicked) {
        // console.log('setIsEditable true');
        setIsEditable(true);
      }
    }
  }, [isDoubleClicked]);

  useEffect(() => {
    if (isDoubleClicked === false && !isEditableBoard && isEditable) {
      setIsEditable(false);
      saveBoard();
      setIsDoubleClicked(undefined);
    }
  }, [isEditableBoard]);

  const doubleClickHandler = () => {
    if (isEditableBoard) {
      dispatch(SystemActions.setIsEditableBoard(false));
      // dispatch(BoardsActions.removeTemp());
    }
    setIsDoubleClicked(true);
  };

  const clickHandler = () => {
    if (!isEditable && !isMenuClick) {
      onClick?.(initialTitle!, id!);
    }
  };

  const {
    handleClick,
    handleDoubleClick,
  } = useClickPreventionOnDoubleClick(clickHandler, doubleClickHandler, true);

  useEffect(() => {
    if (isEditableDefault) {
      doubleClickHandler();
    }
  }, [isEditableDefault]);

  useEffect(() => {
    if (belowId) {
      doubleClickHandler();
    }
  }, []);

  const menuButtonClickHandler = (action: EnumMenuActions, payload?: any) => {
    switch (action) {
      case EnumMenuActions.EditBoard: {
        doubleClickHandler();
        break;
      }
      case EnumMenuActions.CardStyle: {
        dispatch(BoardsActions.updateCardType({ id: id!, cardType: payload }));
        break;
      }
      case EnumMenuActions.ReverseColumnOrder: {
        dispatch(ColumnsActions.reverseOrder({ boardId: id! }));
        break;
      }
      case EnumMenuActions.CopyLink: {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
          hidePopup();
        }, 1000);
        return;
      }
      case EnumMenuActions.AddBoardBelow: {
        dispatch(BoardsActions.removeTemp());
        dispatch(BoardsActions.drawBelow({ belowId: id! }));
        break;
      }
      case EnumMenuActions.Delete: {
        dispatch(BoardsActions.remove({ id: id! }));
        break;
      }
      default: break;
    }
    hidePopup();
  };

  const memoMenu = useMemo(() => {
    if (id !== -1) {
      return (
        <div className="board-item__menu">
          {/* {JSON.stringify({ isHover })} */}
          <Menu
            imageSrc="/assets/svg/dots.svg"
            alt="menu"
            imageSize={22}
            size={24}
            isInvisible
            isHoverBlock={isHover}
            onClick={() => {
              setIsMenuClick(true);
            }}
            onMouseEnter={() => setIsMenuClick(true)}
            onMouseLeave={() => setIsMenuClick(false)}
            position="right"
            isAbsolute={false}
            isInvertColor={isActive}
          >
            <ColorPicker onPick={colorPickHandler} activeColor={color} />
            <MenuItem
              text="Edit board"
              imageSrc="/assets/svg/menu/edit.svg"
              hintText="E"
              onClick={() => menuButtonClickHandler(EnumMenuActions.EditBoard)}
            />
            <Divider verticalSpacer={7} horizontalSpacer={10} />
            <Submenu
              text="Card style"
              imageSrc="/assets/svg/menu/rect.svg"
            >
              <MenuItem
                text="Checkboxes"
                imageSrc="/assets/svg/menu/square.svg"
                onClick={() => menuButtonClickHandler(
                  EnumMenuActions.CardStyle, EnumTodoType.Checkboxes,
                )}
              />
              <MenuItem
                text="Arrows"
                imageSrc="/assets/svg/menu/arrow.svg"
                onClick={() => menuButtonClickHandler(
                  EnumMenuActions.CardStyle, EnumTodoType.Arrows,
                )}
              />
              <MenuItem
                text="Dots"
                imageSrc="/assets/svg/menu/circle.svg"
                onClick={() => menuButtonClickHandler(
                  EnumMenuActions.CardStyle, EnumTodoType.Dots,
                )}
              />
              <MenuItem
                text="Dashes"
                imageSrc="/assets/svg/menu/dash.svg"
                onClick={() => menuButtonClickHandler(
                  EnumMenuActions.CardStyle, EnumTodoType.Dashes,
                )}
              />
              <MenuItem
                text="Nothing"
                onClick={() => menuButtonClickHandler(
                  EnumMenuActions.CardStyle, EnumTodoType.Nothing,
                )}
              />
            </Submenu>
            <Submenu
              text="Icon"
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
                        onClick={(e: React.SyntheticEvent) => {
                          e.stopPropagation();
                          dispatch(BoardsActions.updateIcon({ id: id!, icon: link }));
                        }}
                      />
                    );
                  })
              }
              </div>
            </Submenu>
            <MenuItem
              text="Reverse column order"
              imageSrc="/assets/svg/menu/reverse.svg"
              onClick={() => menuButtonClickHandler(EnumMenuActions.ReverseColumnOrder)}
            />
            <CopyToClipboard
              text={`verticals.xom9ik.com/${username}/${toReadableId(initialTitle!, id!)}`}
              onCopy={() => {
                menuButtonClickHandler(EnumMenuActions.CopyLink);
              }}
            >
              <MenuItem
                text={isCopied ? 'Copied!' : 'Copy link'}
                imageSrc="/assets/svg/menu/copy-link.svg"
              />
            </CopyToClipboard>
            <Divider verticalSpacer={7} horizontalSpacer={10} />
            <MenuItem
              text="Add board below"
              imageSrc="/assets/svg/menu/add-board.svg"
              onClick={() => menuButtonClickHandler(EnumMenuActions.AddBoardBelow)}
            />
            <Divider verticalSpacer={7} horizontalSpacer={10} />
            <MenuItem
              text="Delete"
              imageSrc="/assets/svg/menu/remove.svg"
              hintText="⌫"
              onClick={() => menuButtonClickHandler(EnumMenuActions.Delete)}
            />
          </Menu>
        </div>
      );
    }
  }, [id, isHover, isActive, color, username, isCopied]);

  const memoCounter = useMemo(() => (
    <div className="board-item__counter">
      <img src="/assets/svg/board/search.svg" alt="" />
      {countTodos}
    </div>
  ), [countTodos]);

  const boardItem = useMemo(() => (
    <div
      className={cn('board-item', {
        'board-item--editable': isEditable,
        'board-item--dragging': snapshot?.isDragging,
        'board-item--active': isActive,
      })}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      {
        isEditable ? (
          <div
            className="card__block-wrapper card__block-wrapper--editable"
          >
            <img
              src={icon}
              alt="ico"
            />
            <div className="card__editable-content">
              <TextArea
                ref={titleInputRef}
                className="card__textarea"
                value={titleValue}
                placeholder="New Board"
                minRows={1}
                maxRows={20}
                onKeyDown={shiftEnterRestriction}
                onChange={(event: any) => changeHandler(event, false)}
                onKeyDownCapture={(event: any) => keyDownHandler(event)}
              />
              <TextArea
                ref={descriptionInputRef}
                className="card__textarea card__textarea--description"
                value={descriptionValue}
                placeholder="Notes"
                minRows={1}
                maxRows={20}
                onKeyDown={shiftEnterRestriction}
                onChange={(event: any) => changeHandler(event, true)}
                onKeyDownCapture={(event: any) => keyDownHandler(event)}
              />
            </div>
          </div>
        ) : (
          <RoundedButton
            icon={icon}
            isSpecialIcon={icon.includes('trash') || icon.includes('star')}
            text={titleValue}
            color={color}
            isActive={isActive || snapshot?.isDragging}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
          >
            { isSearchMode ? memoCounter : memoMenu }
          </RoundedButton>
        )
      }
    </div>
  ), [
    isHover, isActive, isMenuClick,
    isEditable, titleValue, descriptionValue,
    snapshot, color, countTodos, icon, username, isCopied, isSearchMode,
  ]);

  return (
    <>{ boardItem }</>
  );
};
