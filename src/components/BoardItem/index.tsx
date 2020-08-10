import React, {
  FC, SyntheticEvent, useEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DraggableStateSnapshot } from 'react-beautiful-dnd';
import { icons } from '@/icons';
import { Menu } from '@comp/Menu';
import { MenuButton } from '@comp/MenuButton';
import { Divider } from '@comp/Divider';
import { ColorPicker } from '@comp/ColorPicker';
import { Submenu } from '@comp/Submenu';
import { BoardsActions, SystemActions } from '@/store/actions';
import { IRootState } from '@/store/reducers/state';
import { useClickPreventionOnDoubleClick } from '@/use/clickPreventionOnDoubleClick';
import { useFocus } from '@/use/focus';
import { EnumColors, EnumTodoType } from '@/types';
import { TextArea } from '@comp/TextArea';

interface IBoardItem {
  snapshot?: DraggableStateSnapshot,
  id?: string;
  icon: string;
  color?: number;
  title?: string;
  countTodos?: number | undefined;
  isActive?: boolean;
  description?: string;
  isEditableDefault?: boolean;
  onExitFromEditable?: (
    boardId: string, title?: string, description?: string, color?: number
  ) => void;
  onClick?: (id: string)=>void;
}

enum EnumMenuActions {
  EditBoard,
  CardStyle,
  CopyLink,
  AddBoardBelow,
  Delete,
}

export const BoardItem: FC<IBoardItem> = ({
  snapshot,
  id = '',
  icon,
  color,
  title: initialTitle = '',
  countTodos,
  description: initialDescription,
  isEditableDefault,
  onExitFromEditable,
  isActive = false,
  onClick,
}) => {
  const dispatch = useDispatch();
  const { focus } = useFocus();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isMenuClick, setIsMenuClick] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const { isEditableBoard } = useSelector((state: IRootState) => state.system);
  const [isDoubleClicked, setIsDoubleClicked] = useState<boolean>();
  const [titleValue, setTitleValue] = useState<string>(initialTitle || '');
  const [descriptionValue, setDescriptionValue] = useState<string>(initialDescription || '');
  const titleInputRef = useRef<any>(null);
  const descriptionInputRef = useRef<any>(null);

  const getNewData = () => ({
    newTitle: initialTitle !== titleValue
      ? titleValue.trim()
      : undefined,
    newDescription: initialDescription !== descriptionValue
      ? descriptionValue.trim()
      : undefined,
  });

  const hidePopup = () => {
    dispatch(SystemActions.setIsOpenPopup(false));
    setIsHover(false);
  };

  const saveBoard = (newColor?: number) => {
    const { newTitle, newDescription } = getNewData();
    onExitFromEditable?.(id, newTitle, newDescription, newColor);
    hidePopup();
  };

  const colorPickHandler = (newColor: number) => {
    dispatch(SystemActions.setIsOpenPopup(false));
    saveBoard(newColor);
  };

  useEffect(() => {
    focus(titleInputRef);
  }, [isEditable]);

  const keydownHandler = (event: any, isDescription: boolean) => {
    const {
      key, ctrlKey, shiftKey,
    } = event;
    if (key === 'Enter' && !ctrlKey && !shiftKey) {
      if (!isDescription) {
        setTitleValue(titleValue.trim());
        focus(descriptionInputRef);
      } else {
        saveBoard();
        setIsEditable(false);
      }
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

  const doubleClickHandler = (_?: SyntheticEvent, isMenuClickDefault: boolean = isMenuClick) => {
    if (isMenuClickDefault || id === 'trash' || id === 'today') return;
    if (isEditableBoard) {
      dispatch(SystemActions.setIsEditableBoard(false));
      // dispatch(BoardsActions.removeNewBoards());
    }
    setIsDoubleClicked(true);
  };

  const clickHandler = () => {
    if (!isEditable && !isMenuClick) {
      onClick?.(id);
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
    if (id === 'new-board') {
      doubleClickHandler();
    }
  }, []);

  const menuButtonClickHandler = (action: EnumMenuActions, payload?: any) => {
    switch (action) {
      case EnumMenuActions.EditBoard: {
        doubleClickHandler(undefined, false);
        break;
      }
      case EnumMenuActions.CardStyle: {
        dispatch(BoardsActions.updateCardType({ id, cardType: payload }));
        break;
      }
      case EnumMenuActions.CopyLink: {
        console.log('copy', `https://${id}`);
        break;
      }
      case EnumMenuActions.AddBoardBelow: {
        dispatch(BoardsActions.removeNewBoards());
        dispatch(BoardsActions.addBoardBelow({ id }));
        break;
      }
      case EnumMenuActions.Delete: {
        dispatch(BoardsActions.remove({ id }));
        break;
      }
      default: break;
    }
    hidePopup();
  };

  const memoMenu = useMemo(() => (
    <>
      {
          id !== 'trash' && id !== 'today' && (
          <Menu
            imageSrc={icons.dots}
            alt="menu"
            imageSize={22}
            size={24}
            isHide
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
            <MenuButton
              text="Edit board"
              imageSrc={icons.menu.edit}
              hintText="E"
              onClick={() => menuButtonClickHandler(EnumMenuActions.EditBoard)}
            />
            <Divider verticalSpacer={7} horizontalSpacer={10} />
            <Submenu
              text="Card style"
              imageSrc={icons.menu.rect}
            >
              <MenuButton
                text="Checkboxes"
                imageSrc={icons.menu.square}
                onClick={() => menuButtonClickHandler(
                  EnumMenuActions.CardStyle, EnumTodoType.Checkboxes,
                )}
              />
              <MenuButton
                text="Arrows"
                imageSrc={icons.menu.arrow}
                onClick={() => menuButtonClickHandler(
                  EnumMenuActions.CardStyle, EnumTodoType.Arrows,
                )}
              />
              <MenuButton
                text="Dots"
                imageSrc={icons.menu.circle}
                onClick={() => menuButtonClickHandler(
                  EnumMenuActions.CardStyle, EnumTodoType.Dots,
                )}
              />
              <MenuButton
                text="Dashes"
                imageSrc={icons.menu.dash}
                onClick={() => menuButtonClickHandler(
                  EnumMenuActions.CardStyle, EnumTodoType.Dashes,
                )}
              />
              <MenuButton
                text="Nothing"
                onClick={() => menuButtonClickHandler(
                  EnumMenuActions.CardStyle, EnumTodoType.Nothing,
                )}
              />
            </Submenu>
            <MenuButton
              text="Copy link"
              imageSrc={icons.menu.copyLink}
              onClick={() => menuButtonClickHandler(EnumMenuActions.CopyLink)}
            />
            <Divider verticalSpacer={7} horizontalSpacer={10} />
            <MenuButton
              text="Add board below"
              imageSrc={icons.menu.addBoard}
              onClick={() => menuButtonClickHandler(EnumMenuActions.AddBoardBelow)}
            />
            <Divider verticalSpacer={7} horizontalSpacer={10} />
            <MenuButton
              text="Delete"
              imageSrc={icons.menu.remove}
              hintText="⌫"
              onClick={() => menuButtonClickHandler(EnumMenuActions.Delete)}
            />
          </Menu>
          )
        }
    </>
  ), [id, isHover, isActive, color]);

  const memoCounter = useMemo(() => (
    <div className="board-item__counter">
      <img src={icons.board.search} alt="" />
      {countTodos}
    </div>
  ), [countTodos]);

  // @ts-ignore
  const colorClass = `board-item--${Object.keys(EnumColors)[color]?.toLowerCase()}`;

  const boardItem = useMemo(() => (
    <div
      className={`board-item 
       ${isActive ? 'board-item--active' : ''} 
       ${isEditable ? 'board-item--editable' : ''} 
       ${color !== undefined ? colorClass : ''} 
       ${snapshot?.isDragging ? 'board-item--dragging' : ''} 
       `}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className="board-item__content">
        <img
          src={`${isActive
            ? icon.replace('item', 'item-active')
            : icon}`}
          alt="ico"
          className="board-item__image"
        />
        {
              isEditable ? (
                <div
                  className="card__editable-content"
                >
                  <TextArea
                    ref={titleInputRef}
                    className="card__textarea"
                    value={titleValue}
                    placeholder="New Card"
                    minRows={1}
                    maxRows={20}
                    onChange={(event: any) => changeHandler(event, false)}
                    onKeyUp={(event: any) => keydownHandler(event, false)}
                  />
                  <TextArea
                    ref={descriptionInputRef}
                    className="card__textarea card__textarea--description"
                    value={descriptionValue}
                    placeholder="Notes"
                    minRows={1}
                    maxRows={20}
                    onChange={(event: any) => changeHandler(event, true)}
                    onKeyDownCapture={(event: any) => keydownHandler(event, true)}
                  />
                </div>
              ) : (
                <span className="board-item__text">{titleValue}</span>
              )
            }
      </div>
      { !isEditable && typeof countTodos !== 'number' && memoMenu }
      { typeof countTodos === 'number' && memoCounter }
    </div>
  ), [
    isActive, isHover, isMenuClick,
    isEditable, titleValue, descriptionValue,
    snapshot, color, countTodos,
  ]);

  return (
    <>{ boardItem }</>
  );
};
