import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DragDropContext, Draggable, Droppable, DropResult,
} from 'react-beautiful-dnd';
import { Menu } from '../Menu';
import { BoardItem } from '../BoardItem';
import { Profile } from '../Profile';
import { IRootState } from '../../store/reducers/state';
import { BoardsActions, SystemActions } from '../../store/actions';
import {
  IBoard, IBoards, IColumn, ITodo, ITodos,
} from '../../types';
import { useFilterTodos } from '../../use/filterTodos';

interface IBoardList {
  activeBoard: string;
  onChange: (boardId: string) => void;
}

export const BoardList: FC<IBoardList> = ({ activeBoard, onChange }) => {
  const dispatch = useDispatch();
  const { filterTodos } = useFilterTodos();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [boards, setBoards] = useState<IBoards>([]);
  const [isOpenNewBoard, setIsOpenNewBoard] = useState<boolean>(false);

  const {
    system: { query },
    boards: initialBoards,
    todos,
    columns,
  } = useSelector((state: IRootState) => state);

  useEffect(() => {
    setBoards(initialBoards);
  }, [initialBoards]);

  const saveBoard = (
    boardId: string, newTitle?: string, newDescription?: string, newColor?: number,
  ) => {
    console.log('saveBoard', newColor);
    setIsOpenNewBoard(false);
    if (boardId || boardId === 'new-board') {
      if (newTitle) {
        dispatch(BoardsActions.updateTitle({
          id: boardId,
          title: newTitle,
        }));
      }
      if (newDescription) {
        dispatch(BoardsActions.updateDescription({
          id: boardId,
          description: newDescription,
        }));
      }
      if (newColor !== undefined) {
        const boardToChange = boards.find((board) => board.id === boardId);
        console.log('boardToChange?.color', boardToChange?.color, 'newColor', newColor);
        if (boardToChange?.color === newColor) {
          dispatch(BoardsActions.resetColor({ id: boardId }));
        } else {
          dispatch(BoardsActions.updateColor({
            id: boardId,
            color: newColor,
          }));
        }
      }
      if (boardId === 'new-board' && (newTitle)) {
        dispatch(BoardsActions.generateNewId({ id: boardId }));
      } else {
        dispatch(BoardsActions.removeNewBoards());
      }
    } else if (newTitle) {
      dispatch(BoardsActions.add({
        icon: '/svg/board/item.svg',
        title: newTitle,
        description: newDescription,
      }));
    }
  };

  const reorder = (list: IBoards, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result.map((board, index) => ({ ...board, position: index }));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;
    dispatch(BoardsActions.updatePosition(
      {
        sourcePosition: source.index,
        destinationPosition: destination.index,
      },
    ));
    const items = reorder(
      boards,
      source.index,
      destination.index,
    );
    setBoards(items);
  };

  const getCountTodos = (boardId: string) => {
    // let isContainTodosByQuery = true;
    const needColumn = columns.filter((column: IColumn) => column.boardId === boardId);
    const needTodos: ITodos = [];
    needColumn.forEach((column: IColumn) => {
      todos.forEach((todo: ITodo) => {
        if (todo.columnId === column.id) {
          needTodos.push(todo);
        }
      });
    });
    // if (query) {
    //
    //   // isContainTodosByQuery = countTodos > 0;
    // }
    // if (['trash', 'today'].includes(id)) { return null; }
    // if (!isContainTodosByQuery) { return countTodos; }
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
            <BoardItem
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
        {
          drawBoard(boards[0])
        }
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
                    id, icon, title, color,
                  }, index) => {
                    const countTodos = getCountTodos(id);
                    if (query && !countTodos) return null;
                    if (['trash', 'today'].includes(id)) { return null; }
                    return (
                      <Draggable
                        key={id}
                        draggableId={id}
                        index={index}
                        isDragDisabled={!!query}
                      >
                        {(draggableProvided, draggableSnapshot) => (
                          <div
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                          >
                            <BoardItem
                              snapshot={draggableSnapshot}
                              key={id}
                              id={id}
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
          drawBoard(boards[1])
        }
      </>

    );
  }, [boards, activeBoard, query]);

  const profile = useMemo(() => (
    <Profile />
  ), []);

  const memoNewBoard = useMemo(() => (
    isOpenNewBoard && (
    <BoardItem
      icon="/svg/board/item.svg"
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
            imageSrc="/svg/add.svg"
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

  // useEffect(() => {
  //   if (!isEditableBoard) {
  //     setIsOpenNewBoard(false);
  //   }
  // }, [isEditableBoard]);

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
    </div>
  );
};
