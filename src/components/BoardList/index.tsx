import React, {
  FC, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DragDropContext, Draggable, Droppable, DropResult,
} from 'react-beautiful-dnd';
import { Menu } from '@comp/Menu';
import { Board, IExitFromEditable } from '@comp/Board';
import { Profile } from '@comp/Profile';
import { IRootState } from '@/store/reducers/state';
import { BoardsActions, SystemActions } from '@/store/actions';
import {
  EnumTodoType, IBoard, IColumn, ITodo, ITodos,
} from '@/types';
import { useFilterTodos } from '@/use/filterTodos';
import { FallbackLoader } from '@comp/FallbackLoader';

interface IBoardList {
  activeBoard?: number;
  onChange: (boardId: number) => void;
}

export const BoardList: FC<IBoardList> = ({ activeBoard, onChange }) => {
  const dispatch = useDispatch();
  const { filterTodos } = useFilterTodos();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isOpenNewBoard, setIsOpenNewBoard] = useState<boolean>(false);

  const {
    system: { query, isLoadedBoards },
    boards,
    todos,
    columns,
  } = useSelector((state: IRootState) => state);

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
      // if (belowId) {
      //   dispatch(BoardsActions.removeTemp());
      // }
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

  const drawBoard = (board: IBoard) => {
    if (!board) {
      return null;
    }
    const { id, icon, title } = board;
    const countTodos = getCountTodos(id);
    return (
      <>
        {
          ((query && countTodos > 0) || !query) && (
            <Board
              key={id}
              id={id}
              icon={icon}
              title={title}
              countTodos={query ? countTodos : undefined}
              isActive={activeBoard === id}
              onClick={() => onChange(id)}
            />
          )
        }
      </>
    );
  };

  const boardItems = useMemo(() => {
    console.log('boards redraw');
    return (
      <>
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
                    console.log('id', id);
                    // if (['trash', 'today'].includes(id)) { return null; }
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
                              isActive={activeBoard === id}
                              onClick={() => onChange(id)}
                              onExitFromEditable={saveBoard}
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
        {
          drawBoard({
            id: -1,
            icon: '/assets/svg/board/trash.svg',
            title: 'Trash',
            position: boards.length,
            cardType: EnumTodoType.Checkboxes,
          })
        }
      </>

    );
  }, [boards, activeBoard, query]);

  const profile = useMemo(() => (
    <Profile />
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

  const memoMenu = useMemo(() => (
    <>
      {
          !isOpenNewBoard && (
          <Menu
            imageSrc="/assets/svg/add.svg"
            alt="add"
            text="Add board"
            isHide
            isHoverBlock={isHover}
            isMaxWidth
            style={{ margin: '0 6px' }}
            isShowPopup={false}
            onClick={() => {
              setIsOpenNewBoard((prev) => !prev);
              dispatch(SystemActions.setIsEditableBoard(true));
            }}
          />
          )
        }
    </>
  ), [isHover, isOpenNewBoard]);

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
