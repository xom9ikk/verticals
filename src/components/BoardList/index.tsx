import React, { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DragDropContext, Draggable, Droppable, DropResult,
} from 'react-beautiful-dnd';
import { Board } from '@comp/Board';
import { Profile } from '@comp/Profile';
import { BoardsActions, SystemActions } from '@store/actions';
import { FallbackLoader } from '@comp/FallbackLoader';
import { useReadableId } from '@use/readableId';
import { redirectTo } from '@router/history';
import { Link } from 'react-router-dom';
import {
  getActiveBoardId,
  getEditableBoardId,
  getIsLoadedBoards,
  getUsername,
  getIsSearchMode,
  getActiveBoardTitle,
  getActiveTodoTitle,
  getBoardPositions, getActiveSubTodoTitle,
} from '@store/selectors';
import { ControlButton } from '@comp/ControlButton';
import { useTitle } from '@use/title';
import { NEW_BOARD_ID, TRASH_BOARD_ID } from '@/constants';
import { useTranslation } from 'react-i18next';

export const BoardList: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { toReadableId } = useReadableId();

  const username = useSelector(getUsername);
  const boardPositions = useSelector(getBoardPositions);
  const isSearchMode = useSelector(getIsSearchMode);
  const isLoadedBoards = useSelector(getIsLoadedBoards);
  const activeBoardId = useSelector(getActiveBoardId);
  const activeBoardTitle = useSelector(getActiveBoardTitle);
  const activeTodoTitle = useSelector(getActiveTodoTitle);
  const activeSubTodoTitle = useSelector(getActiveSubTodoTitle);
  const editableBoardId = useSelector(getEditableBoardId);

  useTitle(activeTodoTitle || activeSubTodoTitle || activeBoardTitle);

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
    dispatch(BoardsActions.effect.move({
      sourcePosition,
      destinationPosition,
    }));
  };

  const addNewBoard = () => {
    dispatch(SystemActions.setEditableBoardId(NEW_BOARD_ID));
  };

  const handleClick = (title: string, id: number) => {
    if (!isSearchMode) {
      dispatch(SystemActions.setIsLoadedColumns(false));
      dispatch(SystemActions.setIsLoadedTodos(false));
    }
    redirectTo(`/${username}/${toReadableId(title, id)}`);
  };

  const boardItems = useMemo(() => (
    <div
      onClick={(e) => {
        if (editableBoardId) {
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
              {boardPositions.map((id, index) => (
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
                        boardId={id}
                        isActive={activeBoardId === id}
                        isEditable={editableBoardId === id}
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
        {!isSearchMode && (
          <Board
            boardId={TRASH_BOARD_ID}
            isEditable={false}
            isActive={activeBoardId === TRASH_BOARD_ID}
          />
        )}
      </Link>
    </div>
  ),
  [t, boardPositions, activeBoardId, isSearchMode, editableBoardId, username]);

  const memoAddNewBoard = useMemo(() => (
    <ControlButton
      imageSrc="/assets/svg/add.svg"
      className="add-board"
      alt="add"
      text={t('Add board')}
      isInvisible
      isMaxWidth
      onClick={addNewBoard}
    />
  ),
  [t, editableBoardId]);

  return (
    <div className="board-list">
      <Profile onAddNewBoard={addNewBoard} />
      { boardItems }
      { editableBoardId !== NEW_BOARD_ID && memoAddNewBoard }
      {
        editableBoardId === NEW_BOARD_ID && (
        <Board
          boardId={NEW_BOARD_ID}
          isEditable={editableBoardId === NEW_BOARD_ID}
        />
        )
      }
      <FallbackLoader
        backgroundColor="#fafafa"
        isAbsolute
        size="medium"
        isLoading={!isLoadedBoards}
      />
    </div>
  );
};
