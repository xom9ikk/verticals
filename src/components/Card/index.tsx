/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  FC, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { CardContextMenu } from '@comp/CardContextMenu';
import { SystemActions } from '@/store/actions';
import { IRootState } from '@/store/reducers/state';
import { useFocus } from '@/use/focus';
import { EnumColors, EnumTodoStatus, EnumTodoType } from '@/types';
import { useClickPreventionOnDoubleClick } from '@/use/clickPreventionOnDoubleClick';
import { TextArea } from '@comp/TextArea';
import { Bullet } from '@comp/Bullet';

interface ISaveTodo {
  newStatus?: EnumTodoStatus;
  newColor?: EnumColors;
}

interface ICard {
  cardType: EnumTodoType;
  id?: number;
  belowId?: number;
  title?: string;
  description?: string;
  status?: EnumTodoStatus;
  color?: EnumColors;
  isArchive?: boolean;
  isNotificationsEnabled?: boolean;
  invertColor?: boolean;
  isEditableDefault?: boolean;
  onExitFromEditable?: (
    title?: string,
    description?: string,
    status?: EnumTodoStatus,
    color?: EnumColors) => void;
  isActive?: boolean;
  provided?: any;
  snapshot?: any;
}

export const Card: FC<ICard> = ({
  id,
  belowId,
  cardType,
  title: initialTitle = '',
  description: initialDescription = '',
  status = EnumTodoStatus.Todo,
  color,
  isArchive,
  isNotificationsEnabled,
  invertColor,
  isEditableDefault,
  onExitFromEditable,
  isActive,
  provided,
  snapshot,
}) => {
  const dispatch = useDispatch();
  const { focus } = useFocus();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isDoubleClicked, setIsDoubleClicked] = useState<boolean>();
  const [isMouseDown, setIsMouseDown] = useState<boolean>();
  const { system: { isEditableCard } } = useSelector((state: IRootState) => state);
  const [titleValue, setTitleValue] = useState<string>(initialTitle);
  const [descriptionValue, setDescriptionValue] = useState<string>(initialDescription);
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
    onExitFromEditable?.(newTitle, newDescription, newStatus, newColor);
    setIsHover(false);
  };

  const keydownHandler = (event: any, isDescription: boolean) => {
    const {
      key, ctrlKey, shiftKey,
    } = event;
    if (key === 'Enter' && !ctrlKey && !shiftKey) {
      if (!isDescription) {
        setTitleValue(titleValue.trim());
        focus(descriptionInputRef);
      } else {
        saveTodo();
        setIsEditable(false);
      }
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

  const changeStatusHandler = () => {
    if (status === EnumTodoStatus.Done) {
      saveTodo({ newStatus: EnumTodoStatus.Todo });
    } else {
      saveTodo({ newStatus: EnumTodoStatus.Done });
    }
  };

  const doubleClickHandler = () => {
    if (isEditableCard) {
      dispatch(SystemActions.setIsEditableCard(false));
    }
    setIsDoubleClicked(true);
  };

  const clickHandler = () => {
    dispatch(SystemActions.setCurrentTodoId(id!));
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

  const card = useMemo(() => {
    console.log('rerender crd', status);
    return (
      <div
        className={`card__block-wrapper 
          ${isEditable ? 'card__block-wrapper--editable' : ''}
        `}
        onClick={handleClick}
      >
        <Bullet
          type={cardType}
          status={status}
          onChangeStatus={changeStatusHandler}
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
                    onChange={(event: any) => changeTextHandler(event, false)}
                    onKeyUp={(event: any) => keydownHandler(event, false)}
                  />
                  <TextArea
                    ref={descriptionInputRef}
                    className="card__textarea card__textarea--description"
                    value={descriptionValue}
                    placeholder="Notes"
                    minRows={1}
                    maxRows={20}
                    onChange={(event: any) => changeTextHandler(event, true)}
                    onKeyDownCapture={(event: any) => keydownHandler(event, true)}
                  />
                </div>
              ) : (
                <div
                  className="card__inner"
                >
                  <span>
                    {titleValue}
                  </span>
                </div>

              )
            }
        </div>
      </div>
    );
  }, [
    status, isEditable, isEditableCard, isEditableDefault,
    titleInputRef, titleValue,
    descriptionInputRef, descriptionValue, cardType,
  ]);

  // @ts-ignore
  const colorClass = color !== undefined ? `card__wrapper--${Object.values(EnumColors)[color]?.toLowerCase()}` : '';

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
        className={`card__wrapper
        ${snapshot?.isDragging ? 'card__wrapper--dragging' : ''}
        ${isEditable ? 'card__wrapper--editable' : ''}
        ${isMouseDown || isActive ? 'card__wrapper--pressed' : ''}
        ${color !== undefined ? colorClass : ''}
        ${invertColor ? 'card__wrapper--invert' : ''}
        `}
      >
        { card }
        {
            !isEditable && (
            <CardContextMenu
              id={id}
              isArchive={isArchive}
              isActive={isActive}
              isHover={isHover}
              isNotificationsEnabled={isNotificationsEnabled}
              color={color}
              status={status}
              onStartEdit={doubleClickHandler}
              onChangeColor={colorPickHandler}
              onHidePopup={hidePopupHandler}
            />
            )
          }
      </div>
    </div>
  );
};
