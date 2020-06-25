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
  IBoards, IColumn, ITodo, ITodos,
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

  // useEffect(() => {
  //   if (!isEditableBoard) {
  //     setIsOpenNewBoard(false);
  //     // dispatch(SystemActions.setIsEditableBoard(false));
  //   }
  // }, [isEditableBoard]);

  const saveBoard = (
    boardId: string, newTitle?: string, newDescription?: string, newColor?: number,
  ) => {
    console.log('saveBoard', newColor);
    setIsOpenNewBoard(false);
    if (boardId) {
      if (newTitle) {
        dispatch(BoardsActions.updateTitle(boardId, newTitle));
      }
      if (newDescription) {
        dispatch(BoardsActions.updateDescription(boardId, newDescription));
      }
      if (newColor !== undefined) {
        dispatch(BoardsActions.updateColor(boardId, newColor));
      }
    } else if (newTitle || newDescription) {
      dispatch(BoardsActions.add(boardId, '/svg/board/item.svg', newTitle, newDescription));
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
      source.index, destination.index,
    ));
    const items = reorder(
      boards,
      source.index,
      destination.index,
    );
    setBoards(items);
  };

  const boardItems = useMemo(() => (
    <>
      <BoardItem
        key="today"
        id="today"
        icon="/svg/board/star.svg"
        title="Today"
        isActive={activeBoard === 'today'}
        onClick={() => onChange('today')}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {boards
                .sort((a, b) => a.position - b.position)
                .map(({
                  id, icon, title, color,
                }, index) => {
                  let isContainTodosByQuery = true;
                  let countTodos = 0;
                  if (query) {
                    const needColumn = columns.filter((column: IColumn) => column.boardId === id);
                    const needTodos: ITodos = [];
                    needColumn.forEach((column: IColumn) => {
                      todos.forEach((todo: ITodo) => {
                        if (todo.columnId === column.id) {
                          needTodos.push(todo);
                        }
                      });
                    });
                    countTodos = needTodos.filter(filterTodos).length;
                    isContainTodosByQuery = countTodos > 0;
                  }
                  if (!isContainTodosByQuery) {
                    return null;
                  }
                  return (
                    <Draggable key={id} draggableId={id} index={index} isDragDisabled={!!query}>
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
      <BoardItem
        key="trash"
        id="trash"
        icon="/svg/board/trash.svg"
        title="Trash"
        isActive={activeBoard === 'trash'}
        onClick={() => onChange('trash')}
      />
    </>

  ), [boards, activeBoard, query]);

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
            style={{ margin: '0 6px', width: '209px' }}
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
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      { profile }
      { boardItems }
      { memoMenu }
      { memoNewBoard }
    </div>
  );
};
