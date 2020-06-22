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
import { EnumColors } from '../../types';

interface IBoardItem {
  snapshot?: DraggableStateSnapshot,
  id?: string;
  icon: string;
  color?: number;
  title?: string;
  isActive?: boolean;
  description?: string;
  isEditableDefault?: boolean;
  onExitFromEditable?: (
    boardId: string, title?: string, description?: string, color?: number
  ) => void;
  onClick?: (id: string)=>void;
}

export const BoardItem: FC<IBoardItem> = ({
  snapshot,
  id = '',
  icon,
  color = '',
  title: initialTitle = '',
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

  const saveBoard = (color?: number) => {
    const { newTitle, newDescription } = getNewData();
    onExitFromEditable?.(id, newTitle, newDescription, color);
  };

  const colorPickHandler = (color: number) => {
    dispatch(BoardsActions.updateColor(id, color));
    dispatch(SystemActions.setIsOpenPopup(false));
    saveBoard(color);
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
  } = useClickPreventionOnDoubleClick(clickHandler, doubleClickHandler);

  useEffect(() => {
    if (isEditableDefault) {
      doubleClickHandler();
    }
  }, [isEditableDefault]);

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
              console.log('open menu');
            }}
            onMouseEnter={() => setIsMenuClick(true)}
            onMouseLeave={() => setIsMenuClick(false)}
            position="right"
            isInvertColor={isActive}
          >
            <ColorPicker onPick={colorPickHandler} />
            <MenuButton
              text="Edit board"
              imageSrc="/svg/menu/edit.svg"
              hintText="E"
            />
            <Divider verticalSpacer={7} horizontalSpacer={10} />
            <Submenu
              text="Card style"
              imageSrc="/svg/menu/rect.svg"
            >
              <MenuButton
                text="Checkboxes"
                imageSrc="/svg/menu/square.svg"
              />
              <MenuButton
                text="Arrows"
                imageSrc="/svg/menu/arrow.svg"
              />
              <MenuButton
                text="Dots"
                imageSrc="/svg/menu/circle.svg"
              />
              <MenuButton
                text="Dashes"
                imageSrc="/svg/menu/dash.svg"
              />
              <MenuButton
                text="Nothing"
              />
            </Submenu>
            <MenuButton
              text="Copy link"
              imageSrc="/svg/menu/copy-link.svg"
            />
            <Divider verticalSpacer={7} horizontalSpacer={10} />
            <MenuButton
              text="Add board below"
              imageSrc="/svg/menu/add-board.svg"
            />
            <Divider verticalSpacer={7} horizontalSpacer={10} />
            <MenuButton
              text="Delete"
              imageSrc="/svg/menu/delete.svg"
              hintText="⌫"
            />
          </Menu>
          )
        }
    </>
  ), [id, isHover, isActive]);

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
        // @ts-ignore
      // style={color !== undefined ? { background: colors[color]?.replace('0.99', '0.1') } : {}}
    >
      <div className="board-item__content">
        <img
          src={`${isActive
            ? icon.replace('item', 'item--active')
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
      { !isEditable && memoMenu }
    </div>
  ), [isActive, isHover, isMenuClick, isEditable, titleValue, descriptionValue, snapshot]);

  return (
    <>{ boardItem }</>
  );
};
