import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DragDropContext, Draggable, Droppable, DropResult,
} from 'react-beautiful-dnd';
import { Menu } from '@comp/Menu';
import { Board, IExitFromEditable } from '@comp/Board';
import { Profile } from '@comp/Profile';
import { BoardsActions, SystemActions } from '@/store/actions';
import {
  EnumTodoType, IColumn, ITodo, ITodos,
} from '@/types/entities';
import { useFilterTodos } from '@/use/filterTodos';
import { FallbackLoader } from '@comp/FallbackLoader';
import { useReadableId } from '@/use/readableId';
import { forwardTo } from '@/router/history';
import { Link } from 'react-router-dom';
import {
  getActiveBoardId,
  getIsEditableBoard,
  getIsLoadedBoards,
  getQuery,
  getBoards,
  getColumns,
  getTodos,
} from '@/store/selectors';

interface IBoardList {}

export const BoardList: FC<IBoardList> = () => {
  const dispatch = useDispatch();
  const { filterTodos } = useFilterTodos();
  const { toReadableId } = useReadableId();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isOpenNewBoard, setIsOpenNewBoard] = useState<boolean>(false);

  const boards = useSelector(getBoards);
  const columns = useSelector(getColumns);
  const todos = useSelector(getTodos);
  const query = useSelector(getQuery);
  const isLoadedBoards = useSelector(getIsLoadedBoards);
  const activeBoardId = useSelector(getActiveBoardId);
  const isEditableBoard = useSelector(getIsEditableBoard);

  useEffect(() => {
    if (boards.length) {
      console.log('boards change');
      if (activeBoardId === null) {
        const { id, title } = boards[0];
        forwardTo(`/userId/${toReadableId(title, id)}`);
      }
    }
  }, [boards]);

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
        const boardToChange = boards.find((board) => board.id === boardId);
        dispatch(BoardsActions.updateColor({
          id: boardId,
          color: boardToChange?.color !== color ? color : null,
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
    const destinationPosition = destination.index;
    if (sourcePosition === destinationPosition) {
      return;
    }
    dispatch(BoardsActions.updatePosition(
      {
        sourcePosition,
        destinationPosition,
      },
    ));
  };

  const getCountTodos = (boardId: number) => {
    const needColumn = columns.filter((column: IColumn) => column.boardId === boardId);
    const needTodos: ITodos = [];
    needColumn.forEach((column: IColumn) => {
      todos.forEach((todo: ITodo) => {
        if (todo.columnId === column.id) {
          needTodos.push(todo);
        }
      });
    });
    return needTodos.filter(filterTodos).length;
  };

  const addNewBoard = () => {
    setIsOpenNewBoard((prev) => !prev);
    dispatch(SystemActions.setIsEditableBoard(true));
  };

  // const drawBoard = (board: IBoard) => {
  //   if (!board) {
  //     return null;
  //   }
  //   const { id, icon, title } = board;
  //   const countTodos = getCountTodos(id);
  //   return (
  //     <>
  //       {
  //         ((query && countTodos > 0) || !query) && (
  //         <NavLink to={toReadableId(title, id)}>
  //           <Board
  //             key={id}
  //             id={id}
  //             icon={icon}
  //             title={title}
  //             countTodos={query ? getCountTodos(id) : undefined}
  //             isActive={activeBoardId === id}
  //             // onClick={handleClick}
  //           />
  //         </NavLink>
  //         )
  //       }
  //     </>
  //   );
  // };

  const handleClick = (title: string, id: number) => {
    dispatch(SystemActions.setIsLoadedColumns(false));
    dispatch(SystemActions.setIsLoadedTodos(false));
    forwardTo(`/userId/${toReadableId(title, id)}`);
  };

  const boardItems = useMemo(() => {
    console.log('boards redraw');
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
                {boards
                  .sort((a, b) => a.position - b.position)
                  .map(({
                    id, icon, title, color, belowId,
                  }, index) => {
                    const countTodos = getCountTodos(id);
                    if (query && !countTodos) return null;
                    return (
                      <Draggable
                        key={`board-${id}`}
                        draggableId={`board-${id}`}
                        index={index}
                        isDragDisabled={!!query}
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
                              countTodos={query ? countTodos : undefined}
                              isActive={activeBoardId === id}
                              onExitFromEditable={saveBoard}
                              onClick={handleClick}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Link to="/userId/trash">
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
  }, [boards, activeBoardId, query, isEditableBoard]);

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
    <Menu
      imageSrc="/assets/svg/add.svg"
      alt="add"
      text="Add board"
      isHide
      isHoverBlock={isHover}
      isMaxWidth
      isShowPopup={false}
      onClick={addNewBoard}
    />
  ),
  [isHover, isOpenNewBoard]);

  return (
    <div
      className="board-list"
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
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
