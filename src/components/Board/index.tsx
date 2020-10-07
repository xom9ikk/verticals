import React, {
  FC, useEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DraggableStateSnapshot } from 'react-beautiful-dnd';
import { Menu } from '@comp/Menu';
import { MenuButton } from '@comp/MenuButton';
import { Divider } from '@comp/Divider';
import { ColorPicker } from '@comp/ColorPicker';
import { Submenu } from '@comp/Submenu';
import { TextArea } from '@comp/TextArea';
import { RoundedButton } from '@comp/RoundedButton';
import { BoardsActions, ColumnsActions, SystemActions } from '@/store/actions';
import { IRootState } from '@/store/reducers/state';
import { useClickPreventionOnDoubleClick } from '@/use/clickPreventionOnDoubleClick';
import { useFocus } from '@/use/focus';
import { EnumColors, EnumTodoType } from '@/types';
import { useShiftEnterRestriction } from '@/use/shiftEnterRestriction';

const icons = ['apple', 'archive', 'arrow-down', 'arrow-left', 'arrow-right', 'arrow-up', 'attach', 'bachelor',
  'ball', 'bell', 'book', 'bookmark', 'calendar', 'card', 'carrot', 'chair', 'change', 'cheese', 'circle', 'coffee',
  'croissant', 'cross', 'file', 'flag', 'foot', 'gallery', 'geo', 'heart', 'help', 'home', 'item', 'keyboard',
  'light-bulb', 'link', 'lock', 'mail', 'message', 'music', 'phone', 'player',
  'preferences', 'preferences-2', 'profile', 'profiles', 'raspberry', 'restart', 'restart-2', 'rocket', 'scissors',
  'search', 'share-link', 'shortcut', 'shrimp', 'smile-1', 'smile-10', 'smile-11', 'smile-12', 'smile-13', 'smile-14',
  'smile-2', 'smile-3', 'smile-4', 'smile-5', 'smile-6', 'smile-7', 'smile-8', 'smile-9', 'sound-off',
  'sound-on', 'stop', 'tick', 'tick-2', 'timer', 'usd', 'wallet', 'trash', 'fire', 'star', 'twitch', 'youtube',
  'github', 'linkedin', 'twitter', 'facebook', 'instagram', 'snap', 'tik-tok'];

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
  countTodos?: number | undefined;
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
  countTodos,
  description: initialDescription = '',
  isEditableDefault,
  onExitFromEditable,
  isActive = false,
  onClick,
}) => {
  const dispatch = useDispatch();
  const { focus } = useFocus();
  const { shiftEnterRestriction } = useShiftEnterRestriction();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isMenuClick, setIsMenuClick] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const { isEditableBoard } = useSelector((state: IRootState) => state.system);
  const [isDoubleClicked, setIsDoubleClicked] = useState<boolean>();
  const [titleValue, setTitleValue] = useState<string>(initialTitle);
  const [descriptionValue, setDescriptionValue] = useState<string>(initialDescription);
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

  const saveBoard = (newColor?: EnumColors) => {
    const { newTitle, newDescription } = getNewData();
    onExitFromEditable?.({
      boardId: id,
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
      onClick?.(initialTitle, id);
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
        dispatch(BoardsActions.updateCardType({ id, cardType: payload }));
        break;
      }
      case EnumMenuActions.ReverseColumnOrder: {
        // TODO
        dispatch(ColumnsActions.reverseOrder({ boardId: id }));
        break;
      }
      case EnumMenuActions.CopyLink: {
        // TODO
        console.log('copy', `https://${id}`);
        break;
      }
      case EnumMenuActions.AddBoardBelow: {
        dispatch(BoardsActions.removeTemp());
        dispatch(BoardsActions.drawBelow({ belowId: id }));
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
    <div className="board-item__menu">
      {/* {JSON.stringify({ isHover })} */}
      <Menu
        imageSrc="/assets/svg/dots.svg"
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
          imageSrc="/assets/svg/menu/edit.svg"
          hintText="E"
          onClick={() => menuButtonClickHandler(EnumMenuActions.EditBoard)}
        />
        <Divider verticalSpacer={7} horizontalSpacer={10} />
        <Submenu
          text="Card style"
          imageSrc="/assets/svg/menu/rect.svg"
        >
          <MenuButton
            text="Checkboxes"
            imageSrc="/assets/svg/menu/square.svg"
            onClick={() => menuButtonClickHandler(
              EnumMenuActions.CardStyle, EnumTodoType.Checkboxes,
            )}
          />
          <MenuButton
            text="Arrows"
            imageSrc="/assets/svg/menu/arrow.svg"
            onClick={() => menuButtonClickHandler(
              EnumMenuActions.CardStyle, EnumTodoType.Arrows,
            )}
          />
          <MenuButton
            text="Dots"
            imageSrc="/assets/svg/menu/circle.svg"
            onClick={() => menuButtonClickHandler(
              EnumMenuActions.CardStyle, EnumTodoType.Dots,
            )}
          />
          <MenuButton
            text="Dashes"
            imageSrc="/assets/svg/menu/dash.svg"
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
        <Submenu
          text="Icon"
          imageSrc="/assets/svg/menu/icon.svg"
        >
          <div className="menu__icons-container">
            {
              icons.map((filename) => {
                const link = `/assets/svg/board/${filename}.svg`;
                return (
                  <Menu
                    key={filename}
                    imageSrc={link}
                    alt={filename}
                    imageSize={24}
                    size={36}
                    isShowPopup={false}
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
        <MenuButton
          text="Reverse column order"
          imageSrc="/assets/svg/menu/reverse.svg"
          onClick={() => menuButtonClickHandler(EnumMenuActions.ReverseColumnOrder)}
        />
        <MenuButton
          text="Copy link"
          imageSrc="/assets/svg/menu/copy-link.svg"
          onClick={() => menuButtonClickHandler(EnumMenuActions.CopyLink)}
        />
        <Divider verticalSpacer={7} horizontalSpacer={10} />
        <MenuButton
          text="Add board below"
          imageSrc="/assets/svg/menu/add-board.svg"
          onClick={() => menuButtonClickHandler(EnumMenuActions.AddBoardBelow)}
        />
        <Divider verticalSpacer={7} horizontalSpacer={10} />
        <MenuButton
          text="Delete"
          imageSrc="/assets/svg/menu/remove.svg"
          hintText="⌫"
          onClick={() => menuButtonClickHandler(EnumMenuActions.Delete)}
        />
      </Menu>
    </div>
  ), [id, isHover, isActive, color]);

  const memoCounter = useMemo(() => (
    <div className="board-item__counter">
      <img src="/assets/svg/board/search.svg" alt="" />
      {countTodos}
    </div>
  ), [countTodos]);

  // @ts-ignore
  // const colorClass = `board-item--${Object.values(EnumColors)[color]?.toLowerCase()}`;

  const boardItem = useMemo(() => (
    <div
      className={`board-item 
       ${isEditable ? 'board-item--editable' : ''} 
       ${snapshot?.isDragging ? 'board-item--dragging' : ''} 
       `}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      // onMouseOver={() => setIsHover(true)}
      // onMouseOut={() => setIsHover(false)}
      // onClick={handleClick}
      // onDoubleClick={handleDoubleClick}
    >

      {/* <div className="board-item__content"> */}
      {/*  <img */}
      {/*    src={`${isActive */}
      {/*      ? icon.replace('item', 'item-active') */}
      {/*      : icon}`} */}
      {/*    alt="ico" */}
      {/*    className="board-item__image" */}
      {/*  /> */}
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
                  {/* {JSON.stringify({ icon })} */}
                  { typeof countTodos === 'number' ? memoCounter : memoMenu }
                </RoundedButton>
              )
            }
      {/* </div> */}
      {/* { !isEditable && typeof countTodos !== 'number' && memoMenu } */}
    </div>
  ), [
    isHover, isActive, isMenuClick,
    isEditable, titleValue, descriptionValue,
    snapshot, color, countTodos, icon,
  ]);
  // console.log('ishover', isHover);

  return (
    <>{ boardItem }</>
  );
};
