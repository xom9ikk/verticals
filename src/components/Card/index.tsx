import React, {
  FC, useEffect, useMemo, useRef, useState,
} from 'react';
import cn from 'classnames';
import useKeys from '@rooks/use-keys';
import { useDispatch, useSelector } from 'react-redux';
import useOutsideClickRef from '@rooks/use-outside-click-ref';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { redirectTo } from '@router/history';
import {
  EnumTodoStatus, EnumTodoType, IColor, ITodo,
} from '@type/entities';
import { CommentsActions, SystemActions, TodosActions } from '@store/actions';
import {
  getUsername,
  getActiveBoardReadableId, getTodoById,
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
import { DateBadge } from '@comp/DateBadge';
import { useTranslation } from 'react-i18next';
import { DatePickerPopup } from '@comp/DatePicker/Popup';
import { useEffectState } from '@use/effectState';
import { useNormalizeDate } from '@use/normalizeDate';
import { useParamSelector } from '@use/paramSelector';

interface ICard {
  provided?: DraggableProvided;
  snapshot?: DraggableStateSnapshot;
  todoId: number;
  columnIdForNew?: number;
  cardType: EnumTodoType;
  // columnId: number;
  // belowId?: number;
  // title?: string;
  // description?: string;
  // status?: EnumTodoStatus;
  // color?: IColor;
  // isArchived?: boolean;
  // isNotificationsEnabled?: boolean;
  // isRemoved?: boolean;
  // expirationDate?: Date | null;
  invertColor?: boolean;
  isEditable: boolean;
  // commentsCount?: number;
  // imagesCount?: number;
  // attachmentsCount?: number;
  isActive?: boolean;
  scrollToBottom?: () => void;
}

export const Card: FC<ICard> = ({
  provided,
  snapshot,
  todoId,
  columnIdForNew,
  cardType,
  // columnId,
  // belowId,
  // title = '',
  // description = '',
  // status = EnumTodoStatus.Todo,
  // color,
  // isArchived,
  // isNotificationsEnabled,
  // isRemoved,
  // expirationDate,
  // commentsCount,
  // imagesCount,
  // attachmentsCount,
  invertColor,
  isEditable,
  isActive,
  scrollToBottom,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { merge, filter } = useFileList();
  const { openFiles } = useOpenFiles();
  const { toReadableId } = useReadableId();
  const { shiftEnterRestriction } = useShiftEnterRestriction();
  const { isNewValues } = useNewValues();
  const { normalizeDate } = useNormalizeDate();

  const {
    columnId,
    belowId,
    title = '',
    description = '',
    status = EnumTodoStatus.Todo,
    color,
    isArchived,
    isNotificationsEnabled,
    isRemoved,
    expirationDate,
    commentsCount,
    imagesCount,
    attachmentsCount,
  } = useParamSelector(getTodoById, todoId) as ITodo;

  const colorClass = useColorClass('card__content', color);

  const username = useSelector(getUsername);
  const activeBoardReadableId = useSelector(getActiveBoardReadableId);

  const [isHover, setIsHover] = useState<boolean>(false);
  const [isMouseDown, setIsMouseDown] = useState<boolean>();
  const [files, setFiles] = useState<FileList | null>(new DataTransfer().files);

  const [titleValue, setTitleValue] = useEffectState<string>(title);
  const [descriptionValue, setDescriptionValue] = useEffectState<string>(description);
  const [expirationDateValue, setExpirationDateValue] = useEffectState<Date | null>(expirationDate || null);

  const buttonRef = useRef<any>(null);
  const titleInputRef = useRef<any>(null);

  useFocus(titleInputRef, [isEditable]);

  const handleChangeText = (event: any, isDescription: boolean) => {
    const { value } = event.target;
    return isDescription
      ? setDescriptionValue(value)
      : setTitleValue(value);
  };

  const handleColorPick = (newColor: IColor) => {
    dispatch(TodosActions.effect.update({ id: todoId!, color: newColor }));
  };

  const handleChangeStatus = (newStatus: EnumTodoStatus) => {
    dispatch(TodosActions.effect.update({ id: todoId!, status: newStatus }));
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
      dispatch(CommentsActions.effect.create({
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

    const validColumnId = columnIdForNew === undefined ? columnId : columnIdForNew;

    if (`${validColumnId}-${todoId}` !== `${validColumnId}-${NEW_TODO_ID}` && belowId === undefined) {
      const isNew = isNewValues(
        [title, normalizedTitleValue],
        [description, normalizedDescriptionValue],
        [expirationDate, expirationDateValue],
      );
      if (normalizedTitleValue && isNew) {
        dispatch(TodosActions.effect.update({
          id: todoId,
          title: normalizedTitleValue,
          description: normalizedDescriptionValue,
          expirationDate: normalizeDate(expirationDateValue),
        }));
      } else {
        setTitleValue(title);
        setDescriptionValue(description);
      }
      saveAttachments(files);
      dispatch(SystemActions.setEditableCardId(null));
    } else {
      if (normalizedTitleValue) {
        dispatch(TodosActions.effect.create({
          columnId: validColumnId!,
          title: normalizedTitleValue,
          description: normalizedDescriptionValue,
          expirationDate: normalizeDate(expirationDateValue),
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

  const handleSelectDate = (selectedDate: Date | null) => {
    dispatch(SystemActions.setActivePopupId(null));
    setExpirationDateValue(selectedDate);
  };

  const handleSelectDateAndUpdate = (selectedDate: Date | null) => {
    dispatch(SystemActions.setActivePopupId(null));
    dispatch(TodosActions.effect.update({
      id: todoId,
      expirationDate: selectedDate,
    }));
  };

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
          style={{ marginTop: isEditable ? 11 : 12 }}
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
                placeholder={t('New Card')}
                minRows={1}
                maxRows={20}
                onKeyDown={shiftEnterRestriction}
                onKeyDownCapture={handleKeyDown}
                onChange={(event: any) => handleChangeText(event, false)}
              />
              <TextArea
                className="card__textarea card__textarea--description"
                value={descriptionValue}
                placeholder={t('Notes')}
                minRows={1}
                maxRows={20}
                onKeyDown={shiftEnterRestriction}
                onKeyDownCapture={handleKeyDown}
                onChange={(event: any) => handleChangeText(event, true)}
              />
              <div>
                {expirationDateValue && (
                <DateBadge
                  popupId="card"
                  position="bottom"
                  todoId={todoId}
                  // style={{ maxWidth: 55 }}
                  date={expirationDateValue}
                  onSelectDate={handleSelectDate}
                />
                )}
              </div>
              <CommentFormAttachments
                files={files}
                onRemove={handleRemoveFile}
                isListView
              />
              <div className="card__editable-container">
                <div className="card__editable-controls">
                  <ControlButton
                    ref={buttonRef}
                    imageSrc="/assets/svg/calendar-dots.svg"
                    tooltip={t('Add Date')}
                    alt="date"
                    imageSize={16}
                    size={20}
                    isColored
                  />
                  <DatePickerPopup
                    popupId={`card-${todoId}`}
                    sourceRef={buttonRef}
                    onSelectDate={handleSelectDate}
                    selectedDate={expirationDateValue}
                  />
                  <ControlButton
                    imageSrc="/assets/svg/attach.svg"
                    tooltip={t('Attach a file')}
                    alt="file"
                    imageSize={16}
                    size={20}
                    onClick={handleUploadFile}
                    isColored
                  />
                </div>
                <span>{t('Drop files here')}</span>
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
                isRemoved={isRemoved}
                expirationDate={expirationDate}
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
              <DateBadge
                popupId="card"
                todoId={todoId}
                date={expirationDate}
                onSelectDate={handleSelectDateAndUpdate}
              />
              <CardAttachmentsPreview
                columnId={columnId}
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
    t, todoId, columnId, status, isEditable, color,
    titleValue, descriptionValue, expirationDateValue, cardType,
    isActive, files, isHover,
    commentsCount, imagesCount, attachmentsCount,
    isNotificationsEnabled, isArchived, isRemoved, expirationDate,
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
