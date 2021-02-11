import React, {
  FC, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DragDropContext, Draggable, Droppable, DropResult,
} from 'react-beautiful-dnd';
import { Board, IExitFromEditable } from '@comp/Board';
import { Profile } from '@comp/Profile';
import { BoardsActions, SystemActions } from '@store/actions';
import {
  EnumTodoType,
} from '@type/entities';
import { FallbackLoader } from '@comp/FallbackLoader';
import { useReadableId } from '@use/readableId';
import { forwardTo } from '@router/history';
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

interface IBoardList {}

export const BoardList: FC<IBoardList> = () => {
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

  // useEffect(() => {
  //   if (boards.length) {
  //     console.log('boards change');
  //     if (activeBoardId === null) {
  //       const { id, title } = boards[0];
  //       forwardTo(`/userId/${toReadableId(title, id)}`);
  //     }
  //   }
  // }, [boards]);

  const saveBoard = (
    {
      boardId, title, description, color, belowId,
    }: IExitFromEditable,
  ) => {
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
    setIsOpenNewBoard((prev) => !prev);
    dispatch(SystemActions.setIsEditableBoard(true));
  };

  const handleClick = (title: string, id: number) => {
    if (!isSearchMode) {
      dispatch(SystemActions.setIsLoadedColumns(false));
      dispatch(SystemActions.setIsLoadedTodos(false));
    }
    forwardTo(`/${username}/${toReadableId(title, id)}`);
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
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {/* TODO: move to selector */}
                {boards
                  .map(({
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
