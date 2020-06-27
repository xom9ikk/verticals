import React, {
  FC, useEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { DraggableStateSnapshot } from 'react-beautiful-dnd';
import { Menu } from '../Menu';
import { MenuButton } from '../MenuButton';
import { Divider } from '../Divider';
import { ColorPicker } from '../ColorPicker';
import { Submenu } from '../Submenu';
import { BoardsActions, SystemActions } from '../../store/actions';
import { IRootState } from '../../store/reducers/state';
import { useClickPreventionOnDoubleClick } from '../../use/clickPreventionOnDoubleClick';
import { useFocus } from '../../use/focus';
import { EnumColors, EnumTodoType } from '../../types';

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
  onAddBoardBelow?: (id: string)=>void;
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
  onAddBoardBelow,
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

  const saveBoard = (newColor?: number) => {
    const { newTitle, newDescription } = getNewData();
    onExitFromEditable?.(id, newTitle, newDescription, newColor);
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

  const doubleClickHandler = () => {
    if (isMenuClick || id === 'trash' || id === 'today') return;
    if (isEditableBoard) {
      dispatch(SystemActions.setIsEditableBoard(false));
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

  const hidePopup = () => {
    dispatch(SystemActions.setIsOpenPopup(false));
    setIsHover(false);
  };

  const menuButtonClickHandler = (action: EnumMenuActions, payload?: any) => {
    switch (action) {
      case EnumMenuActions.EditBoard: {
        doubleClickHandler();
        break;
      }
      case EnumMenuActions.CardStyle: {
        dispatch(BoardsActions.updateCardType(id, payload));
        break;
      }
      case EnumMenuActions.CopyLink: {
        console.log('copy', `https://${id}`);
        break;
      }
      case EnumMenuActions.AddBoardBelow: {
        onAddBoardBelow?.(id);
        break;
      }
      case EnumMenuActions.Delete: {
        dispatch(BoardsActions.removeBoard(id));
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
            imageSrc="/svg/dots.svg"
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
              imageSrc="/svg/menu/edit.svg"
              hintText="E"
              onClick={() => menuButtonClickHandler(EnumMenuActions.EditBoard)}
            />
            <Divider verticalSpacer={7} horizontalSpacer={10} />
            <Submenu
              text="Card style"
              imageSrc="/svg/menu/rect.svg"
            >
              <MenuButton
                text="Checkboxes"
                imageSrc="/svg/menu/square.svg"
                onClick={() => menuButtonClickHandler(
                  EnumMenuActions.CardStyle, EnumTodoType.Checkboxes,
                )}
              />
              <MenuButton
                text="Arrows"
                imageSrc="/svg/menu/arrow.svg"
                onClick={() => menuButtonClickHandler(
                  EnumMenuActions.CardStyle, EnumTodoType.Arrows,
                )}
              />
              <MenuButton
                text="Dots"
                imageSrc="/svg/menu/circle.svg"
                onClick={() => menuButtonClickHandler(
                  EnumMenuActions.CardStyle, EnumTodoType.Dots,
                )}
              />
              <MenuButton
                text="Dashes"
                imageSrc="/svg/menu/dash.svg"
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
              imageSrc="/svg/menu/copy-link.svg"
              onClick={() => menuButtonClickHandler(EnumMenuActions.CopyLink)}
            />
            <Divider verticalSpacer={7} horizontalSpacer={10} />
            <MenuButton
              text="Add board below"
              imageSrc="/svg/menu/add-board.svg"
              onClick={() => menuButtonClickHandler(EnumMenuActions.AddBoardBelow)}
            />
            <Divider verticalSpacer={7} horizontalSpacer={10} />
            <MenuButton
              text="Delete"
              imageSrc="/svg/menu/delete.svg"
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
      <img src="/svg/board/search.svg" alt="" />
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
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
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
                  <TextareaAutosize
                    ref={titleInputRef}
                    className="card__textarea"
                    value={titleValue}
                    placeholder="New Card"
                    minRows={1}
                    maxRows={20}
                    onChange={(event) => changeHandler(event, false)}
                    onKeyUp={(event) => keydownHandler(event, false)}
                  />
                  <TextareaAutosize
                    ref={descriptionInputRef}
                    className="card__textarea card__textarea--description"
                    value={descriptionValue}
                    placeholder="Notes"
                    minRows={1}
                    maxRows={20}
                    onChange={(event) => changeHandler(event, true)}
                    onKeyDownCapture={(event) => keydownHandler(event, true)}
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
  ), [isActive, isHover, isMenuClick, isEditable, titleValue, descriptionValue, snapshot, color, countTodos]);

  return (
    <>{ boardItem }</>
  );
};
