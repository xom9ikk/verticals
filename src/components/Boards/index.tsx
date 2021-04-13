import React, { BaseSyntheticEvent, FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { Board } from '@comp/Board';
import { Profile } from '@comp/Profile';
import { SystemActions } from '@store/actions';
import { FallbackLoader } from '@comp/FallbackLoader';
import { useReadableId } from '@use/readableId';
import { redirectTo } from '@router/history';
import { Link } from 'react-router-dom';
import {
  getActiveBoardId,
  getBoardPositions,
  getEditableBoardId,
  getIsLoadedBoards,
  getIsSearchMode,
  getUsername,
} from '@store/selectors';
import { ControlButton } from '@comp/ControlButton';
import { NEW_BOARD_ID, TRASH_BOARD_ID } from '@/constants';
import { useTranslation } from 'react-i18next';
import { BoardsDragDropContainer } from '@comp/Board/DragDropContainer';

export const Boards: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { toReadableId } = useReadableId();

  const username = useSelector(getUsername);
  const boardPositions = useSelector(getBoardPositions);
  const isSearchMode = useSelector(getIsSearchMode);
  const isLoadedBoards = useSelector(getIsLoadedBoards);
  const activeBoardId = useSelector(getActiveBoardId);
  const editableBoardId = useSelector(getEditableBoardId);

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

  const handleBoardClick = (event: BaseSyntheticEvent) => {
    if (editableBoardId) {
      event.stopPropagation();
    }
  };

  const memoBoards = useMemo(() => (
    <div onClick={handleBoardClick}>
      <BoardsDragDropContainer>
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
                      key={id}
                      snapshot={draggableSnapshot}
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
      </BoardsDragDropContainer>
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

  const memoNewBoard = useMemo(() => (
    <Board
      boardId={NEW_BOARD_ID}
      isEditable={editableBoardId === NEW_BOARD_ID}
    />
  ),
  [editableBoardId]);

  return (
    <div className="board-list">
      <Profile onAddNewBoard={addNewBoard} />
      { memoBoards }
      { editableBoardId !== NEW_BOARD_ID && memoAddNewBoard }
      { editableBoardId === NEW_BOARD_ID && memoNewBoard }
      <FallbackLoader
        backgroundColor="#fafafa"
        isAbsolute
        size="medium"
        isLoading={!isLoadedBoards}
      />
    </div>
  );
};
