/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  FC, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { icons } from '@/icons';
import { CardContextMenu } from '@comp/CardContextMenu';
import { Checkbox } from '@comp/Checkbox';
import { SystemActions } from '@/store/actions';
import { IRootState } from '@/store/reducers/state';
import { useFocus } from '@/use/focus';
import { EnumColors, EnumTodoStatus, EnumTodoType } from '@/types';
import { useClickPreventionOnDoubleClick } from '@/use/clickPreventionOnDoubleClick';
import { TextArea } from '@comp/TextArea';

interface ICard {
  cardType: EnumTodoType;
  id?: string;
  title?: string;
  description?: string;
  status?: EnumTodoStatus;
  color?: number;
  isArchive?: boolean;
  isNotificationsEnabled?: boolean;
  invertColor?: boolean;
  isEditableDefault?: boolean;
  onExitFromEditable?: (
    title?: string,
    description?: string,
    status?: EnumTodoStatus,
    color?: number) => void;
  isActive?: boolean;
  provided?: any;
  snapshot?: any;
}

export const Card: FC<ICard> = ({
  id,
  cardType,
  title: initialTitle = '',
  description: initialDescription = '',
  status: initialStatus = EnumTodoStatus.Todo,
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
  const [status, setStatus] = useState<EnumTodoStatus>(initialStatus);
  const titleInputRef = useRef<any>(null);
  const descriptionInputRef = useRef<any>(null);

  const getNewData = () => ({
    newTitle: initialTitle !== titleValue ? titleValue.trim() : undefined,
    newDescription: initialDescription !== descriptionValue ? descriptionValue.trim() : undefined,
    newStatus: initialStatus !== status ? status : undefined,
  });

  const saveTodo = (newColor?: number) => {
    console.log('save todo');
    const { newTitle, newDescription, newStatus } = getNewData();
    onExitFromEditable?.(newTitle, newDescription, newStatus, newColor);
    setIsHover(false);
  };

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
      console.log('save todo 1');
      saveTodo();
      setIsDoubleClicked(undefined);
    }
  }, [isEditableCard]);

  const doubleClickHandler = () => {
    if (isEditableCard) {
      dispatch(SystemActions.setIsEditableCard(false));
    }
    setIsDoubleClicked(true);
  };

  const clickHandler = () => {
    // console.log('isActive', isActive);
    // if (isActive) {
    //   // TODO: isActive false
    //   // dispatch(SystemActions.setCurrentTodoId(''));
    // } else if (id) {
    //   dispatch(SystemActions.setCurrentTodoId(id));
    // }
    dispatch(SystemActions.setCurrentTodoId(id!));
  };

  const {
    handleClick,
    handleDoubleClick,
  } = useClickPreventionOnDoubleClick(clickHandler, doubleClickHandler, true);

  useEffect(() => {
    if (id === 'new-todo') {
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
    setStatus(initialStatus);
  }, [initialStatus]);

  useEffect(() => {
    setTitleValue(initialTitle);
  }, [initialTitle]);

  useEffect(() => {
    setDescriptionValue(initialDescription);
  }, [initialDescription]);

  const keydownHandler = (event: any, isDescription: boolean) => {
    const {
      key, ctrlKey, shiftKey,
    } = event;
    if (key === 'Enter' && !ctrlKey && !shiftKey) {
      if (!isDescription) {
        setTitleValue(titleValue.trim());
        focus(descriptionInputRef);
      } else {
        console.log('save todo 2');
        saveTodo();
        setIsEditable(false);
      }
    }
  };

  const changeHandler = (event: any, isDescription: boolean) => {
    const { value } = event.target;
    console.log(value);
    return isDescription
      ? setDescriptionValue(value)
      : setTitleValue(value);
  };

  const colorPickHandler = (newColor: number) => {
    saveTodo(newColor);
  };

  const debouncePress = useCallback(
    debounce((isPress: boolean) => setIsMouseDown(isPress), 300),
    [],
  );

  const hidePopupHandler = () => {
    setIsHover(false);
  };

  useEffect(() => {
    if (!isEditableDefault && id !== 'new-todo' && initialStatus !== status) {
      console.log('save todo 4');
      saveTodo();
    }
  }, [status]);

  const bullets = ['arrow', 'dot', 'dash'];

  const renderBullet = (type?: EnumTodoType) => {
    switch (type) {
      case EnumTodoType.Checkboxes:
        return (
          <>
            {
              status === EnumTodoStatus.Doing && (
              <div className="card__overlay-doing" />
              )
            }
            <Checkbox
              isActive={status === EnumTodoStatus.Done}
              onClick={() => {
                setStatus((prev) => {
                  if (prev === EnumTodoStatus.Done) {
                    return EnumTodoStatus.Todo;
                  }
                  return EnumTodoStatus.Done;
                });
              }}
              style={{ marginTop: 10, marginBottom: 10 }}
            />
          </>
        );
      case EnumTodoType.Arrows:
      case EnumTodoType.Dots:
      case EnumTodoType.Dashes:
        return (
          <img
            className="card__bullet"
            // @ts-ignore
            src={icons.card[bullets[type - 1]]}
            alt="bullet"
          />
        );
      case EnumTodoType.Nothing:
        return (
          <></>
        );
      default: return (
        <></>
      );
    }
  };

  const card = useMemo(() => {
    console.log('rerender crd', status);
    return (
      <div
        className={`card__block-wrapper 
     ${isEditable ? 'card__block-wrapper--editable' : ''}
    `}
        onClick={handleClick}
      >
        {
          renderBullet(cardType)
        }
        <div
          className="card__block"
          onMouseDown={() => (!isEditable ? debouncePress(true) : null)}
          onMouseUp={() => (!isEditable ? debouncePress(false) : null)}
          onTouchStart={() => (!isEditable ? debouncePress(true) : null)}
          onTouchEnd={() => (!isEditable ? debouncePress(false) : null)}
          onMouseLeave={() => (!isEditable ? debouncePress(false) : null)}
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
                    onChange={(event: any) => changeHandler(event, false)}
                    onKeyUp={(event: any) => keydownHandler(event, false)}
                  />
                  <TextArea
                    ref={descriptionInputRef}
                    className="card__textarea card__textarea--description"
                    value={descriptionValue}
                    placeholder="Notes"
                    minRows={1}
                    maxRows={20}
                    onChange={(event: any) => changeHandler(event, true)}
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
    descriptionInputRef, descriptionValue,
    // onExitFromEditable,
    cardType,
    // handleClick,
  ]);

  useEffect(() => {
    if (!snapshot?.isDragging) {
      setIsMouseDown(false);
    }
  }, [snapshot?.isDragging]);

  // @ts-ignore
  const colorClass = `card--${Object.keys(EnumColors)[color]?.toLowerCase()}`;

  return (
    <div
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      className={`card
      ${snapshot?.isDragging ? 'card--dragging' : ''}
      ${isEditable ? 'card--editable' : ''}
      ${isMouseDown || isActive ? 'card--pressed' : ''}
      ${color !== undefined ? colorClass : ''}
      ${invertColor ? 'card--invert' : ''}
      `}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      onClick={(e) => e.stopPropagation()}
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
      {/* { contextMenu } */}
    </div>
  );
};
