import React, {
  FC, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DragDropContext, Draggable, Droppable, DropResult,
} from 'react-beautiful-dnd';
import { Board, IExitFromEditable } from '@comp/Board';
import { Profile } from '@comp/Profile';
import { BoardsActions, SystemActions } from '@store/actions';
import { EnumTodoType } from '@type/entities';
import { FallbackLoader } from '@comp/FallbackLoader';
import { useReadableId } from '@use/readableId';
import { redirectTo } from '@router/history';
import { Link } from 'react-router-dom';
import {
  getActiveBoardId,
  getIsEditableBoard,
  getIsLoadedBoards,
  getOrderedBoards,
  getUsername,
  getIsSearchMode, getActiveBoardTitle, getActiveTodoTitle,
} from '@store/selectors';
import { ControlButton } from '@comp/ControlButton';
import { useTitle } from '@use/title';
import { useHover } from '@use/hover';
import { useAutoScroll } from '@use/autoScroll';

export const BoardList: FC = () => {
  const dispatch = useDispatch();
  const { toReadableId } = useReadableId();
  const { isHovering, hoveringProps } = useHover();
  const [isOpenNewBoard, setIsOpenNewBoard] = useState<boolean>(false);

  const username = useSelector(getUsername);
  const boards = useSelector(getOrderedBoards);
  const isSearchMode = useSelector(getIsSearchMode);
  const isLoadedBoards = useSelector(getIsLoadedBoards);
  const activeBoardId = useSelector(getActiveBoardId);
  const activeBoardTitle = useSelector(getActiveBoardTitle);
  const activeTodoTitle = useSelector(getActiveTodoTitle);
  const isEditableBoard = useSelector(getIsEditableBoard);

  useTitle(activeTodoTitle || activeBoardTitle);

  const boardContainerRef = useRef<any>(null);

  const { scrollToBottom } = useAutoScroll(boardContainerRef);

  const saveBoard = ({
    boardId, title, description, color, belowId,
  }: IExitFromEditable) => {
    setIsOpenNewBoard(false);
    if (boardId && !belowId) {
      if (title) {
        dispatch(BoardsActions.updateTitle({
          id: boardId,
          title,
        }));
      }
      if (description) {
        dispatch(BoardsActions.updateDescription({
          id: boardId,
          description,
        }));
      }
      if (color !== undefined) {
        dispatch(BoardsActions.updateColor({
          id: boardId,
          color,
        }));
      }
    } else if (title) {
      setTimeout(() => setIsOpenNewBoard(true));
      setTimeout(scrollToBottom, 500);
      dispatch(BoardsActions.create({
        icon: '/assets/svg/board/item.svg',
        title,
        description: description || undefined,
        cardType: EnumTodoType.Checkboxes,
        belowId,
      }));
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;
    const sourcePosition = source.index;
    const destinationPosition = destination?.index;
    if (destinationPosition === undefined || sourcePosition === destinationPosition) {
      return;
    }
    dispatch(BoardsActions.updatePosition({
      sourcePosition,
      destinationPosition,
    }));
  };

  const addNewBoard = () => {
    requestAnimationFrame(scrollToBottom);
    setIsOpenNewBoard(true);
    dispatch(SystemActions.setIsEditableBoard(true));
  };

  const handleClick = (title: string, id: number) => {
    if (!isSearchMode) {
      dispatch(SystemActions.setIsLoadedColumns(false));
      dispatch(SystemActions.setIsLoadedTodos(false));
    }
    redirectTo(`/${username}/${toReadableId(title, id)}`);
  };

  const boardItems = useMemo(() => {
    console.log('boards redraw', boards);
    return (
      <div
        onClick={(e) => {
          if (isEditableBoard) {
            e.stopPropagation();
          }
        }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {boards.map(({
                  id, icon, title, description, color, belowId,
                }, index) => (
                  <Draggable
                    key={`board-${id}`}
                    draggableId={`board-${id}`}
                    index={index}
                    isDragDisabled={isSearchMode}
                  >
                    {(draggableProvided, draggableSnapshot) => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                      >
                        <Board
                          snapshot={draggableSnapshot}
                          key={id}
                          id={id}
                          belowId={belowId}
                          icon={icon}
                          color={color}
                          title={title}
                          description={description}
                          isActive={activeBoardId === id}
                          onExitFromEditable={saveBoard}
                          onClick={handleClick}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Link to={`/${username}/trash`}>
          <Board
            key={-1}
            id={-1}
            icon="/assets/svg/board/trash.svg"
            title="Trash"
            isActive={activeBoardId === -1}
          />
        </Link>
      </div>
    );
  }, [boards, activeBoardId, isSearchMode, isEditableBoard, username]);

  const profile = useMemo(() => (
    <Profile
      onAddNewBoard={addNewBoard}
    />
  ), []);

  const memoNewBoard = useMemo(() => (
    isOpenNewBoard && (
    <Board
      icon="/assets/svg/board/item.svg"
      isEditableDefault
      onExitFromEditable={saveBoard}
    />
    )
  ), [isOpenNewBoard]);

  const memoMenu = useMemo(() => !isOpenNewBoard && (
    <ControlButton
      imageSrc="/assets/svg/add.svg"
      alt="add"
      text="Add board"
      isInvisible
      isHoverBlock={isHovering}
      isMaxWidth
      onClick={addNewBoard}
    />
  ),
  [isHovering, isOpenNewBoard]);

  return (
    <div
      className="board-list"
      {...hoveringProps}
      ref={boardContainerRef}
    >
      { profile }
      { boardItems }
      { memoMenu }
      { memoNewBoard }
      <FallbackLoader
        backgroundColor="#fafafa"
        isAbsolute
        size="medium"
        isLoading={!isLoadedBoards}
      />
    </div>
  );
};
