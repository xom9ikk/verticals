import React, {
  FC, useMemo, useRef,
} from 'react';
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
  getOrderedBoards,
  getUsername,
  getIsSearchMode,
  getActiveBoardTitle,
  getActiveTodoTitle,
} from '@store/selectors';
import { ControlButton } from '@comp/ControlButton';
import { useTitle } from '@use/title';
import { useHover } from '@use/hover';
import { useAutoScroll } from '@use/autoScroll';
import { NEW_BOARD_ID, TRASH_BOARD_ID } from '@/constants';
import { useTranslation } from 'react-i18next';

export const BoardList: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { toReadableId } = useReadableId();
  const { isHovering, hoveringProps } = useHover();

  const username = useSelector(getUsername);
  const boards = useSelector(getOrderedBoards);
  const isSearchMode = useSelector(getIsSearchMode);
  const isLoadedBoards = useSelector(getIsLoadedBoards);
  const activeBoardId = useSelector(getActiveBoardId);
  const activeBoardTitle = useSelector(getActiveBoardTitle);
  const activeTodoTitle = useSelector(getActiveTodoTitle);
  const editableBoardId = useSelector(getEditableBoardId);

  useTitle(activeTodoTitle || activeBoardTitle);

  const boardContainerRef = useRef<any>(null);

  const { scrollToBottom } = useAutoScroll(boardContainerRef);

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
    dispatch(SystemActions.setEditableBoardId(NEW_BOARD_ID));
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
                          boardId={id}
                          belowId={belowId}
                          icon={icon}
                          color={color}
                          title={title}
                          description={description}
                          isActive={activeBoardId === id}
                          isEditable={editableBoardId === id}
                          scrollToBottom={scrollToBottom}
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
            boardId={TRASH_BOARD_ID}
            icon="/assets/svg/board/trash.svg"
            title={t('Trash')}
            isEditable={false}
            isActive={activeBoardId === TRASH_BOARD_ID}
          />
        </Link>
      </div>
    );
  }, [boards, activeBoardId, isSearchMode, editableBoardId, username]);

  const memoAddNewBoard = useMemo(() => (
    <ControlButton
      imageSrc="/assets/svg/add.svg"
      alt="add"
      text={t('Add board')}
      isInvisible
      isHoverBlock={isHovering}
      isMaxWidth
      onClick={addNewBoard}
    />
  ),
  [isHovering, editableBoardId]);

  return (
    <div
      className="board-list"
      {...hoveringProps}
      ref={boardContainerRef}
    >
      <Profile onAddNewBoard={addNewBoard} />
      { boardItems }
      { editableBoardId !== NEW_BOARD_ID && memoAddNewBoard }
      {
        editableBoardId === NEW_BOARD_ID && (
        <Board
          boardId={NEW_BOARD_ID}
          icon="/assets/svg/board/item.svg"
          isEditable={editableBoardId === NEW_BOARD_ID}
          scrollToBottom={scrollToBottom}
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
