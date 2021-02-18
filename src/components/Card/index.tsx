import React, {
  FC, useEffect, useMemo, useRef, useState,
} from 'react';
import cn from 'classnames';
import useKeys from '@rooks/use-keys';
import { useDispatch, useSelector } from 'react-redux';
import useOutsideClickRef from '@rooks/use-outside-click-ref';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { redirectTo } from '@router/history';
import { EnumTodoStatus, EnumTodoType, IColor } from '@type/entities';
import { CommentsActions, SystemActions, TodosActions } from '@store/actions';
import {
  getUsername,
  getActiveBoardReadableId,
} from '@store/selectors';
import { Bullet } from '@comp/Bullet';
import { DropZone } from '@comp/DropZone';
import { TextArea } from '@comp/TextArea';
import { ControlButton } from '@comp/ControlButton';
import { CardContextMenu } from '@comp/CardContextMenu';
import { CommentFormAttachments } from '@comp/CommentFormAttachments';
import { useFocus } from '@use/focus';
import { useFileList } from '@use/fileList';
import { useOpenFiles } from '@use/openFiles';
import { useReadableId } from '@use/readableId';
import { useColorClass } from '@use/colorClass';
import { useShiftEnterRestriction } from '@use/shiftEnterRestriction';
import { useClickPreventionOnDoubleClick } from '@use/clickPreventionOnDoubleClick';
import { CardAttachmentsPreview } from '@comp/CardAttachmentsPreview';
import { NEW_TODO_ID } from '@/constants';
import { useDebounce } from '@use/debounce';
import { useNewValues } from '@use/newValues';

interface ICard {
  provided?: DraggableProvided;
  snapshot?: DraggableStateSnapshot;
  todoId: number;
  columnId: number;
  cardType: EnumTodoType;
  belowId?: number;
  title?: string;
  description?: string;
  status?: EnumTodoStatus;
  color?: IColor;
  isArchived?: boolean;
  isNotificationsEnabled?: boolean;
  invertColor?: boolean;
  isEditable: boolean;
  commentsCount?: number;
  imagesCount?: number;
  attachmentsCount?: number;
  isActive?: boolean;
  scrollToBottom?: () => void;
}

export const Card: FC<ICard> = ({
  provided,
  snapshot,
  todoId,
  columnId,
  cardType,
  belowId,
  title = '',
  description = '',
  status = EnumTodoStatus.Todo,
  color,
  isArchived,
  isNotificationsEnabled,
  invertColor,
  isEditable,
  commentsCount,
  imagesCount,
  attachmentsCount,
  isActive,
  scrollToBottom,
}) => {
  const dispatch = useDispatch();
  const { merge, filter } = useFileList();
  const { openFiles } = useOpenFiles();
  const { toReadableId } = useReadableId();
  const { shiftEnterRestriction } = useShiftEnterRestriction();
  const { isNewValues } = useNewValues();
  const colorClass = useColorClass('card__content', color);

  const username = useSelector(getUsername);
  const activeBoardReadableId = useSelector(getActiveBoardReadableId);

  const [isHover, setIsHover] = useState<boolean>(false);
  const [isMouseDown, setIsMouseDown] = useState<boolean>();
  const [titleValue, setTitleValue] = useState<string>(title);
  const [descriptionValue, setDescriptionValue] = useState<string>(description);
  const [files, setFiles] = useState<FileList | null>(new DataTransfer().files);

  const titleInputRef = useRef<any>(null);

  useFocus(titleInputRef, [isEditable]);

  const handleChangeText = (event: any, isDescription: boolean) => {
    const { value } = event.target;
    return isDescription
      ? setDescriptionValue(value)
      : setTitleValue(value);
  };

  const handleColorPick = (newColor: IColor) => {
    dispatch(TodosActions.update({ id: todoId!, color: newColor }));
  };

  const handleChangeStatus = (newStatus: EnumTodoStatus) => {
    dispatch(TodosActions.update({ id: todoId!, status: newStatus }));
  };

  const handleClickUnwrapped = () => {
    redirectTo(`/${username}/${activeBoardReadableId}/card/${toReadableId(title, todoId!)}`);
  };

  const handleDoubleClickUnwrapped = () => {
    dispatch(SystemActions.setEditableCardId(todoId));
  };

  const {
    handleClick,
    handleDoubleClick,
  } = useClickPreventionOnDoubleClick(handleClickUnwrapped, handleDoubleClickUnwrapped, isEditable);

  const handleUploadFile = async () => {
    const openedFiles = await openFiles('*', true);
    setFiles((prev) => merge(prev, openedFiles));
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => filter(prev, (file, i) => i !== index));
  };

  const saveAttachments = (attachedFiles: FileList | null) => {
    if (attachedFiles?.length) {
      dispatch(CommentsActions.create({
        todoId,
        text: '',
        files: attachedFiles,
      }));
    }
  };

  const saveTodo = () => {
    if (!isEditable) return;
    const normalizedTitleValue = titleValue.trim();
    const normalizedDescriptionValue = descriptionValue?.trim();

    if (`${columnId}-${todoId}` !== `${columnId}-${NEW_TODO_ID}` && belowId === undefined) {
      const isNew = isNewValues([title, normalizedTitleValue], [description, normalizedDescriptionValue]);
      if (normalizedTitleValue && isNew) {
        dispatch(TodosActions.update({
          id: todoId,
          title: normalizedTitleValue,
          description: normalizedDescriptionValue,
        }));
      } else {
        setTitleValue(title);
        setDescriptionValue(description);
      }
      saveAttachments(files);
      dispatch(SystemActions.setEditableCardId(null));
    } else {
      if (normalizedTitleValue) {
        dispatch(TodosActions.create({
          columnId,
          title: normalizedTitleValue,
          description: normalizedDescriptionValue || undefined,
          belowId,
          files,
        }));
      } else {
        dispatch(SystemActions.setEditableCardId(null));
      }
      if (belowId !== undefined) {
        dispatch(SystemActions.setEditableCardId(null));
      } else {
        setTitleValue('');
        setDescriptionValue('');
        setTimeout(() => {
          scrollToBottom?.();
        }, 200);
      }
    }
    setFiles(new DataTransfer().files);
  };

  const handleKeyDown = (event: any) => {
    const { key, ctrlKey, shiftKey } = event;
    if (key === 'Enter' && !ctrlKey && !shiftKey) {
      saveTodo();
    }
  };

  const handleEsc = () => {
    dispatch(SystemActions.setEditableCardId(null));
    saveTodo();
  };

  const [todoRef] = useOutsideClickRef((e) => {
    if (e.isTrusted) {
      saveTodo();
    }
  }, isEditable);

  useKeys(['Escape'], handleEsc, {
    // @ts-ignore
    target: todoRef,
    when: isEditable,
  });

  useEffect(() => {
    if (belowId) {
      dispatch(SystemActions.setEditableCardId(todoId));
    }
  }, []);

  useEffect(() => {
    if (!snapshot?.isDragging) {
      setIsMouseDown(false);
    }
  }, [snapshot?.isDragging]);

  const debouncePress = useDebounce((value) => {
    if (!isEditable) {
      setIsMouseDown(value);
    }
  }, 300);

  const handleDropFiles = (droppedFiles: FileList) => {
    const mergedFiles = merge(files, droppedFiles);
    if (!isEditable) {
      saveAttachments(mergedFiles);
    } else {
      setFiles(mergedFiles);
    }
  };

  const card = useMemo(() => (
    <div
      className={cn('card__block-wrapper', {
        'card__block-wrapper--editable': isEditable,
      })}
      onClick={(e) => !isEditable && handleClick(e)}
    >
      {
        todoId !== NEW_TODO_ID && (
        <Bullet
          type={cardType}
          status={status}
          onChangeStatus={handleChangeStatus}
          style={{ marginTop: 12 }}
        />
        )
      }
      <div
        className="card__block"
        onMouseDown={() => debouncePress(true)}
        onMouseUp={() => debouncePress(false)}
        onDoubleClick={!isEditable ? handleDoubleClick : () => {}}
      >
        {
          isEditable ? (
            <div className="card__editable-content">
              <TextArea
                ref={titleInputRef}
                className="card__textarea"
                value={titleValue}
                placeholder="New Card"
                minRows={1}
                maxRows={20}
                onKeyDown={shiftEnterRestriction}
                onKeyDownCapture={handleKeyDown}
                onChange={(event: any) => handleChangeText(event, false)}
              />
              <TextArea
                className="card__textarea card__textarea--description"
                value={descriptionValue}
                placeholder="Notes"
                minRows={1}
                maxRows={20}
                onKeyDown={shiftEnterRestriction}
                onKeyDownCapture={handleKeyDown}
                onChange={(event: any) => handleChangeText(event, true)}
              />
              <CommentFormAttachments
                files={files}
                onRemove={handleRemoveFile}
                isListView
              />
              <div className="card__editable-container">
                <div className="card__editable-controls">
                  <ControlButton
                    imageSrc="/assets/svg/calendar-dots.svg"
                    tooltip="Add Date"
                    alt="date"
                    imageSize={16}
                    size={20}
                    isColored
                  />
                  <ControlButton
                    imageSrc="/assets/svg/attach.svg"
                    tooltip="Attach a file"
                    alt="file"
                    imageSize={16}
                    size={20}
                    onClick={handleUploadFile}
                    isColored
                  />
                </div>
                <span>Drop files here</span>
              </div>
            </div>
          ) : (
            <div className="card__inner">
              <CardContextMenu
                menuId="card"
                todoId={todoId}
                title={title}
                columnId={columnId}
                isArchived={isArchived}
                isActive={isActive}
                isHover={isHover}
                isNotificationsEnabled={isNotificationsEnabled}
                color={color}
                status={status}
                onStartEdit={handleDoubleClickUnwrapped}
                onChangeColor={handleColorPick}
              />
              <div
                className={cn('card__title', {
                  'card__title--cross-out': status === EnumTodoStatus.Canceled,
                })}
              >
                {titleValue}
              </div>
              <CardAttachmentsPreview
                todoId={todoId!}
                isActive={isActive}
                commentsCount={commentsCount}
                imagesCount={imagesCount}
                attachmentsCount={attachmentsCount}
              />
            </div>
          )
        }
      </div>
    </div>
  ),
  [
    status, isEditable, color,
    titleValue, descriptionValue, cardType,
    isActive, files, isHover,
    commentsCount, imagesCount, attachmentsCount,
  ]);

  return (
    <div
      ref={(ref) => {
        provided?.innerRef(ref);
        todoRef(ref);
      }}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      className="card"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={cn('card__content', colorClass, {
          'card__content--editable': isEditable,
          'card__content--invert': invertColor,
          'card__content--pressed': isMouseDown || isActive,
          'card__content--dragging': snapshot?.isDragging,
        })}
      >
        <DropZone
          onOpen={handleDropFiles}
          size="small"
        >
          <div className="card__wrapper">
            { card }
          </div>
        </DropZone>
      </div>
    </div>
  );
};
