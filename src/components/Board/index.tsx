/* eslint-disable no-nested-ternary */
import React, {
  FC, useEffect, useMemo, useRef, useState,
} from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { DraggableStateSnapshot } from 'react-beautiful-dnd';
import useKeys from '@rooks/use-keys';
import useOutsideClickRef from '@rooks/use-outside-click-ref';
import { EnumTodoType, IBoard } from '@type/entities';
import { TextArea } from '@comp/TextArea';
import { RoundedButton } from '@comp/RoundedButton';
import { BoardsActions, SystemActions } from '@store/actions';
import { useFocus } from '@use/focus';
import { useNewValues } from '@use/newValues';
import { useShiftEnterRestriction } from '@use/shiftEnterRestriction';
import { useClickPreventionOnDoubleClick } from '@use/clickPreventionOnDoubleClick';
import { getBoardById, getIsSearchMode, getUsername } from '@store/selectors';
import { BoardContextMenu } from '@comp/BoardContextMenu';
import { NEW_BOARD_ID, TRASH_BOARD_ID } from '@/constants';
import { useTranslation } from 'react-i18next';
import { BoardCounter } from '@comp/BoardCounter';
import { useEffectState } from '@use/effectState';
import { useParamSelector } from '@use/paramSelector';
import { EnumScrollPosition, useScrollToRef } from '@use/scrollToRef';

interface IBoardComponent {
  boardId: number;
  snapshot?: DraggableStateSnapshot,
  isEditable: boolean;
  isActive?: boolean;
  onClick?: (title: string, boardId: number) => void;
}

export const Board: FC<IBoardComponent> = ({
  boardId,
  snapshot,
  isEditable,
  isActive = false,
  onClick,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { shiftEnterRestriction } = useShiftEnterRestriction();
  const { isNewValues } = useNewValues();

  const username = useSelector(getUsername);
  const isSearchMode = useSelector(getIsSearchMode);
  const {
    belowId, icon, color, title = '', description = '',
  } = useParamSelector(getBoardById, boardId) as IBoard;

  const [isHover, setIsHover] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useEffectState<string>(title);
  const [descriptionValue, setDescriptionValue] = useEffectState<string>(description);

  const titleInputRef = useRef<any>(null);

  useFocus(titleInputRef, [isEditable]);
  const [scrollToRef, refForScroll] = useScrollToRef<HTMLDivElement>();

  const saveBoard = () => {
    if (!isEditable) return;
    const normalizedTitleValue = titleValue.trim();
    const normalizedDescriptionValue = descriptionValue?.trim();

    if (boardId !== NEW_BOARD_ID && belowId === undefined) {
      const isNew = isNewValues([title, normalizedTitleValue], [description, normalizedDescriptionValue]);
      if (normalizedTitleValue && isNew) {
        dispatch(BoardsActions.effect.update({
          id: boardId,
          title: normalizedTitleValue,
          description: normalizedDescriptionValue,
        }));
      } else {
        setTitleValue(title);
        setDescriptionValue(description);
      }
      dispatch(SystemActions.setEditableBoardId(null));
    } else {
      if (normalizedTitleValue) {
        dispatch(BoardsActions.effect.create({
          icon: '/assets/svg/board/item.svg',
          title: normalizedTitleValue,
          description: normalizedDescriptionValue,
          cardType: EnumTodoType.Checkboxes,
          belowId,
        }));
      } else {
        dispatch(SystemActions.setEditableBoardId(null));
      }
      if (belowId !== undefined) {
        dispatch(SystemActions.setEditableBoardId(null));
      } else {
        setTitleValue('');
        setDescriptionValue('');
      }
    }
  };

  const handleKeyDown = (event: any) => {
    const { key, ctrlKey, shiftKey } = event;
    if (key === 'Enter' && !ctrlKey && !shiftKey) {
      saveBoard();
    }
  };

  const handleChange = (event: any, isDescription: boolean) => {
    const { value } = event.target;
    return isDescription
      ? setDescriptionValue(value)
      : setTitleValue(value);
  };

  const handleEsc = () => {
    dispatch(SystemActions.setEditableBoardId(null));
    saveBoard();
  };

  const [boardRef] = useOutsideClickRef(saveBoard, isEditable);

  useKeys(['Escape'], handleEsc, {
    // @ts-ignore
    target: boardRef,
    when: isEditable,
  });

  const handleDoubleClickUnwrapped = () => {
    dispatch(SystemActions.setEditableBoardId(boardId));
  };

  const handleClickUnwrapped = () => {
    if (!isEditable && !isActive) {
      onClick?.(title, boardId!);
    }
  };

  const {
    handleClick,
    handleDoubleClick,
  } = useClickPreventionOnDoubleClick(handleClickUnwrapped, handleDoubleClickUnwrapped, isEditable);

  useEffect(() => {
    if (belowId) {
      dispatch(SystemActions.setEditableBoardId(boardId));
    }
  }, []);

  useEffect(() => {
    if (isEditable) {
      scrollToRef(EnumScrollPosition.Center);
    }
  }, [isEditable]);

  return useMemo(() => (
    <div
      ref={(r) => {
        boardRef(r);
        refForScroll.current = r;
      }}
      className={cn('board', {
        'board--editable': isEditable,
        'board--dragging': snapshot?.isDragging,
        'board--active': isActive,
      })}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {
        isEditable ? (
          <div className="card__block-wrapper card__block-wrapper--editable">
            <img src={icon} alt="ico" />
            <div className="card__editable-content" style={{ paddingLeft: 2 }}>
              <TextArea
                ref={titleInputRef}
                className="card__textarea"
                value={titleValue}
                placeholder={t('New Board')}
                minRows={1}
                maxRows={20}
                onKeyDown={shiftEnterRestriction}
                onChange={(event: any) => handleChange(event, false)}
                onKeyDownCapture={(event: any) => handleKeyDown(event)}
              />
              <TextArea
                className="card__textarea card__textarea--description"
                value={descriptionValue}
                placeholder={t('Notes')}
                minRows={1}
                maxRows={20}
                onKeyDown={shiftEnterRestriction}
                onChange={(event: any) => handleChange(event, true)}
                onKeyDownCapture={(event: any) => handleKeyDown(event)}
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
            { isSearchMode
              ? <BoardCounter boardId={boardId} isActive={isActive} />
              : boardId === TRASH_BOARD_ID
                ? null
                : (
                  <BoardContextMenu
                    boardId={boardId}
                    title={title}
                    color={color}
                    isActive={isActive}
                    isHover={isHover}
                  />
                )}
          </RoundedButton>
        )
      }
    </div>
  ), [
    t, isHover, isActive, isEditable,
    titleValue, descriptionValue, snapshot,
    color, icon, username, isSearchMode,
  ]);
};
