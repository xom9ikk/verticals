/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  FC, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { CardContextMenu } from '@comp/CardContextMenu';
import { CommentsActions, SystemActions } from '@/store/actions';
import { useFocus } from '@/use/focus';
import {
  EnumColors, EnumTodoStatus, EnumTodoType,
} from '@/types/entities';
import { useClickPreventionOnDoubleClick } from '@/use/clickPreventionOnDoubleClick';
import { TextArea } from '@comp/TextArea';
import { Bullet } from '@comp/Bullet';
import { forwardTo } from '@/router/history';
import { useReadableId } from '@/use/readableId';
import { useShiftEnterRestriction } from '@/use/shiftEnterRestriction';
import { getActiveBoardReadableId, getIsEditableCard, getUsername } from '@/store/selectors';
import { DropZone } from '@comp/DropZone';
import { ControlButton } from '@comp/ControlButton';
import { useFileList } from '@/use/fileList';
import { CommentFormAttachments } from '@comp/CommentFormAttachments';
import { useOpenFiles } from '@/use/openFiles';
import { CardAttachments } from '@comp/CardAttachments';

enum EnumToggleType {
  Files,
  Gallery,
  Comments,
}

interface ISaveTodo {
  newStatus?: EnumTodoStatus;
  newColor?: EnumColors;
}

interface ICard {
  cardType: EnumTodoType;
  id?: number;
  columnId?: number;
  belowId?: number;
  title?: string;
  description?: string;
  status?: EnumTodoStatus;
  color?: EnumColors;
  isArchived?: boolean;
  isNotificationsEnabled?: boolean;
  invertColor?: boolean;
  isEditableDefault?: boolean;
  commentsCount?: number;
  imagesCount?: number;
  attachmentsCount?: number;
  onExitFromEditable?: (
    title?: string,
    description?: string,
    status?: EnumTodoStatus,
    color?: EnumColors,
    belowId?: number,
  ) => void;
  isActive?: boolean;
  provided?: any;
  snapshot?: any;
}

export const Card: FC<ICard> = ({
  id,
  columnId,
  belowId,
  cardType,
  title: initialTitle = '',
  description: initialDescription = '',
  status = EnumTodoStatus.Todo,
  color,
  isArchived,
  isNotificationsEnabled,
  invertColor,
  isEditableDefault,
  commentsCount,
  imagesCount,
  attachmentsCount,
  onExitFromEditable,
  isActive,
  provided,
  snapshot,
}) => {
  const dispatch = useDispatch();
  const { focus } = useFocus();
  const { merge, filter } = useFileList();
  const { openFiles } = useOpenFiles();
  const { toReadableId } = useReadableId();
  const { shiftEnterRestriction } = useShiftEnterRestriction();

  const username = useSelector(getUsername);
  const isEditableCard = useSelector(getIsEditableCard);
  const activeBoardReadableId = useSelector(getActiveBoardReadableId);

  const [isHover, setIsHover] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isDoubleClicked, setIsDoubleClicked] = useState<boolean>();
  const [isMouseDown, setIsMouseDown] = useState<boolean>();
  const [titleValue, setTitleValue] = useState<string>(initialTitle);
  const [descriptionValue, setDescriptionValue] = useState<string>(initialDescription);
  const [files, setFiles] = useState<FileList | null>(new DataTransfer().files);
  const [isShowFiles, setIsShowFiles] = useState<boolean>(false);
  const [isShowGallery, setIsShowGallery] = useState<boolean>(false);

  const titleInputRef = useRef<any>(null);
  const descriptionInputRef = useRef<any>(null);

  const getNewData = () => ({
    newTitle: initialTitle !== titleValue ? titleValue.trim() : undefined,
    newDescription: initialDescription !== descriptionValue ? descriptionValue.trim() : undefined,
  });

  const saveTodo = (data?: ISaveTodo) => {
    console.log('save todo');
    const { newStatus, newColor } = data || {};
    const { newTitle, newDescription } = getNewData();
    onExitFromEditable?.(newTitle, newDescription, newStatus, newColor, belowId);
    setIsHover(false);
  };

  const saveAttachments = (attachedFiles: FileList | null) => {
    if (attachedFiles?.length) {
      dispatch(CommentsActions.create({
        todoId: id!,
        text: '',
        files: attachedFiles,
      }));
    }
    setFiles(null);
  };

  const keydownHandler = (event: any) => {
    const {
      key, ctrlKey, shiftKey,
    } = event;
    if (key === 'Enter' && !ctrlKey && !shiftKey) {
      // if (!isDescription) {
      // setTitleValue(titleValue.trim());
      // focus(descriptionInputRef);
      // } else {
      saveTodo();
      setIsEditable(false);
      saveAttachments(files);
      // }
    }
  };

  const changeTextHandler = (event: any, isDescription: boolean) => {
    const { value } = event.target;
    return isDescription
      ? setDescriptionValue(value)
      : setTitleValue(value);
  };

  const colorPickHandler = (newColor: EnumColors) => {
    saveTodo({ newColor });
  };

  const hidePopupHandler = () => {
    setIsHover(false);
  };

  const changeStatusHandler = (newStatus: EnumTodoStatus) => {
    saveTodo({ newStatus });
  };

  const doubleClickHandler = () => {
    if (isEditableCard) {
      dispatch(SystemActions.setIsEditableCard(false));
    }
    setIsDoubleClicked(true);
  };

  const clickHandler = () => {
    forwardTo(`/${username}/${activeBoardReadableId}/card/${toReadableId(initialTitle, id!)}`);
  };

  const {
    handleClick,
    handleDoubleClick,
  } = useClickPreventionOnDoubleClick(clickHandler, doubleClickHandler, true);

  useEffect(() => {
    if (isDoubleClicked) {
      setIsDoubleClicked(false);
      dispatch(SystemActions.setIsEditableCard(true));
      if (!isEditableCard && isDoubleClicked) {
        setIsEditable(true);
      }
    }
  }, [isDoubleClicked, isEditableCard]);

  useEffect(() => {
    if (isDoubleClicked === false && !isEditableCard && isEditable) {
      setIsEditable(false);
      saveTodo();
      saveAttachments(files);
      setIsDoubleClicked(undefined);
    }
  }, [isEditableCard]);

  useEffect(() => {
    if (belowId) {
      doubleClickHandler();
    }
  }, []);

  useEffect(() => {
    if (isEditableDefault) {
      doubleClickHandler();
    }
  }, [isEditableDefault]);

  useEffect(() => {
    focus(titleInputRef);
  }, [isEditable]);

  useEffect(() => {
    setTitleValue(initialTitle);
  }, [initialTitle]);

  useEffect(() => {
    setDescriptionValue(initialDescription);
  }, [initialDescription]);

  useEffect(() => {
    if (!snapshot?.isDragging) {
      setIsMouseDown(false);
    }
  }, [snapshot?.isDragging]);

  const debouncePress = useCallback(
    debounce((isPress: boolean) => setIsMouseDown(isPress), 300),
    [],
  );

  const handleDropFiles = (droppedFiles: FileList) => {
    const mergedFiles = merge(files, droppedFiles);
    if (!isEditable) {
      saveAttachments(mergedFiles);
    } else {
      setFiles(mergedFiles);
    }
  };

  const handleUploadFile = async () => {
    const openedFiles = await openFiles('*', true);
    console.log('openedFiles', openedFiles);
    setFiles((prev) => merge(prev, openedFiles));
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => filter(prev, (file, i) => i !== index));
  };

  const renderIcon = (
    count: number | undefined,
    name: string,
    tooltip: string,
    onClick: (e: React.SyntheticEvent) => void,
    isColored: boolean,
    text?: string,
  ) => count !== undefined && count > 0 && (
    <ControlButton
      imageSrc={`/assets/svg/${name}.svg`}
      tooltip={tooltip}
      alt={name}
      imageSize={16}
      size={20}
      isInvertColor={isActive}
      isTextable
      text={text}
      onClick={onClick}
      onDoubleClick={(e) => e.stopPropagation()}
      isColored={isColored}
    />
  );

  const handleToggle = (
    event: React.SyntheticEvent,
    type: EnumToggleType,
  ) => {
    switch (type) {
      case EnumToggleType.Files: {
        event.stopPropagation();
        setIsShowFiles((prev) => !prev);
        setIsShowGallery(false); break;
      }
      case EnumToggleType.Gallery: {
        event.stopPropagation();
        setIsShowGallery((prev) => !prev);
        setIsShowFiles(false); break;
      }
      default: break;
    }
  };

  const card = useMemo(() => (
    <div
      className={`card__block-wrapper 
          ${isEditable ? 'card__block-wrapper--editable' : ''}
        `}
      onClick={(e) => !isEditable && handleClick(e)}
    >
      <Bullet
        type={cardType}
        status={status}
        onChangeStatus={changeStatusHandler}
        style={{ marginTop: 12 }}
      />
      <div
        className="card__block"
        onMouseDown={() => (!isEditable ? debouncePress(true) : null)}
        onMouseUp={() => (!isEditable ? debouncePress(false) : null)}
        onDoubleClick={!isEditableDefault ? handleDoubleClick : () => {}}
      >
        {
          isEditable ? (
            <div
              className="card__editable-content"
            >
              <TextArea
                ref={titleInputRef}
                className="card__textarea"
                value={titleValue}
                placeholder="New Card"
                minRows={1}
                maxRows={20}
                onKeyDown={shiftEnterRestriction}
                onKeyDownCapture={(event: any) => keydownHandler(event)}
                onChange={(event: any) => changeTextHandler(event, false)}
              />
              <TextArea
                ref={descriptionInputRef}
                className="card__textarea card__textarea--description"
                value={descriptionValue}
                placeholder="Notes"
                minRows={1}
                maxRows={20}
                onKeyDown={shiftEnterRestriction}
                onKeyDownCapture={(event: any) => keydownHandler(event)}
                onChange={(event: any) => changeTextHandler(event, true)}
              />
              <CommentFormAttachments
                files={files}
                onRemove={handleRemoveFile}
                isListView
              />
              <div
                className="card__editable-container"
              >
                <div
                  className="card__editable-controls"
                >
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
            <div
              className="card__inner"
            >
              <CardContextMenu
                id={id}
                title={initialTitle}
                columnId={columnId}
                isArchived={isArchived}
                isActive={isActive}
                isHover={isHover}
                isNotificationsEnabled={isNotificationsEnabled}
                color={color}
                status={status}
                onStartEdit={doubleClickHandler}
                onChangeColor={colorPickHandler}
                onHidePopup={hidePopupHandler}
              />
              <span
                className={`card__title 
              ${status === EnumTodoStatus.Canceled ? 'card__title--cross-out' : ''}
              `}
              >
                {titleValue}
              </span>
              <div
                className="card__toggle-container"
              >
                {renderIcon(attachmentsCount, 'files', 'Show Files', (e) => handleToggle(e, EnumToggleType.Files), isShowFiles)}
                {renderIcon(imagesCount, 'images', 'Show Gallery', (e) => handleToggle(e, EnumToggleType.Gallery), isShowGallery)}
                {renderIcon(commentsCount, 'bubble', `${commentsCount} comments`, (e) => handleToggle(e, EnumToggleType.Comments), false, String(commentsCount))}
              </div>
              <CardAttachments
                id={id}
                isCollapse={!isShowFiles}
              />
            </div>
          )
        }
      </div>
    </div>
  ),
  [
    status, isEditable, isEditableCard, isEditableDefault,
    titleInputRef, titleValue,
    descriptionInputRef, descriptionValue, cardType,
    isActive, files, isHover, isShowFiles, isShowGallery,
  ]);

  // @ts-ignore
  const colorClass = color !== undefined ? `card__content--${Object.values(EnumColors)[color]?.toLowerCase()}` : '';

  return (
    <div
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      className="card"
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={`card__content
        ${snapshot?.isDragging ? 'card__content--dragging' : ''}
        ${isEditable ? 'card__content--editable' : ''}
        ${isMouseDown || isActive ? 'card__content--pressed' : ''}
        ${color !== undefined ? colorClass : ''}
        ${invertColor ? 'card__content--invert' : ''}
        `}
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
