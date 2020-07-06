/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  FC, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { Menu } from '../Menu';
import { Checkbox } from '../Checkbox';
import { ColorPicker } from '../ColorPicker';
import { MenuButton } from '../MenuButton';
import { Divider } from '../Divider';
import { Submenu } from '../Submenu';
import { SystemActions, TodosActions } from '../../store/actions';
import { IRootState } from '../../store/reducers/state';
import { useFocus } from '../../use/focus';
import { EnumColors, EnumTodoStatus, EnumTodoType } from '../../types';

interface ICard {
  cardType: EnumTodoType;
  id?: string;
  title?: string;
  description?: string;
  status?: EnumTodoStatus;
  color?: number;
  isEditableDefault?: boolean;
  onExitFromEditable?: (
    title?: string,
    description?: string,
    status?: EnumTodoStatus,
    color?: number) => void;
  provided?: any;
  snapshot?: any;
}

enum EnumCardActions {
  EditCard,
  AttachFile,
  AddDate,
  CompleteStatus,
  Notifications,
  CopyLink,
  Duplicate,
  AddCardBelow,
  Delete,
}

export const Card: FC<ICard> = ({
  id,
  cardType,
  title: initialTitle = '',
  description: initialDescription = '',
  status: initialStatus = EnumTodoStatus.Todo,
  color,
  isEditableDefault,
  onExitFromEditable,
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
      saveTodo();
      setIsDoubleClicked(undefined);
    }
  }, [isEditableCard]);

  const doubleClickHandler = () => {
    console.log('double click isEditableCard', isEditableCard);
    if (isEditableCard) {
      console.log('dispatch setIsEditableCard false');
      dispatch(SystemActions.setIsEditableCard(false));
      // if (isEditable) {
      //   setIsEditable(false);
      //   console.log('2');
      //   saveTodo();
      // }
    }
    // if (!isEditable) {
    console.log('dispatch setIsDoubleClicked true');
    setIsDoubleClicked(true);
    // }
  };

  useEffect(() => {
    if (isEditableDefault) {
      doubleClickHandler();
    }
  }, [isEditableDefault]);

  useEffect(() => {
    focus(titleInputRef);
  }, [isEditable]);

  const keydownHandler = (event: any, isDescription: boolean) => {
    const {
      key, ctrlKey, shiftKey,
    } = event;
    if (key === 'Enter' && !ctrlKey && !shiftKey) {
      if (!isDescription) {
        setTitleValue(titleValue.trim());
        focus(descriptionInputRef);
      } else {
        console.log('3');
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
    dispatch(SystemActions.setIsOpenPopup(false));
    saveTodo(newColor);
  };

  const debouncePress = useCallback(
    debounce((isPress: boolean) => setIsMouseDown(isPress), 300),
    [],
  );

  const hidePopup = () => {
    dispatch(SystemActions.setIsOpenPopup(false));
    setIsHover(false);
  };

  const menuButtonClickHandler = (action: EnumCardActions, payload?: any) => {
    switch (action) {
      case EnumCardActions.EditCard: {
        doubleClickHandler();
        break;
      }
      case EnumCardActions.AttachFile: {
        break;
      }
      case EnumCardActions.AddDate: {
        break;
      }
      case EnumCardActions.CompleteStatus: {
        console.log('updateCompleteStatus', payload);
        setStatus(payload);
        dispatch(TodosActions.updateCompleteStatus(id!, payload));
        break;
      }
      case EnumCardActions.Notifications: {
        break;
      }
      case EnumCardActions.CopyLink: {
        console.log('copy', `https://${id}`);
        break;
      }
      case EnumCardActions.Duplicate: {
        console.log('duplicate id', id, titleValue);
        dispatch(TodosActions.duplicate(id!));
        break;
      }
      case EnumCardActions.AddCardBelow: {
        // dispatch(TodosActions.removeNewTodo());
        // dispatch(TodosActions.addTodoBelow(id));
        break;
      }
      case EnumCardActions.Delete: {
        dispatch(TodosActions.remove(id!));
        break;
      }
      default: break;
    }
    hidePopup();
  };

  const contextMenu = useMemo(() => !isEditable && (
  <Menu
    imageSrc="/svg/dots.svg"
    alt="menu"
    imageSize={22}
    size={24}
    isHide
    isHoverBlock={isHover}
    position="right"
    style={{ marginTop: 5, marginRight: 8, marginBottom: 5 }}
  >
    <ColorPicker onPick={colorPickHandler} activeColor={color} />
    <MenuButton
      text="Edit card"
      imageSrc="/svg/menu/edit.svg"
      onClick={() => menuButtonClickHandler(EnumCardActions.EditCard)}
    />
    <MenuButton
      text="Attach file"
      imageSrc="/svg/menu/attach.svg"
      onClick={() => menuButtonClickHandler(EnumCardActions.AttachFile)}
    />
    <MenuButton
      text="Add date"
      imageSrc="/svg/menu/add-date.svg"
      onClick={() => menuButtonClickHandler(EnumCardActions.AddDate)}
    />
    <Submenu
      text="Complete"
      imageSrc="/svg/menu/complete.svg"
    >
      <MenuButton
        text="Mark as to do"
        imageSrc="/svg/menu/rounded-square.svg"
        onClick={() => menuButtonClickHandler(EnumCardActions.CompleteStatus, EnumTodoStatus.Todo)}
      />
      <MenuButton
        text="Mark as doing"
        imageSrc="/svg/menu/rounded-square-half-filled.svg"
        onClick={() => menuButtonClickHandler(EnumCardActions.CompleteStatus, EnumTodoStatus.Doing)}
      />
      <MenuButton
        text="Mark as done"
        imageSrc="/svg/menu/rounded-square-check.svg"
        onClick={() => menuButtonClickHandler(EnumCardActions.CompleteStatus, EnumTodoStatus.Done)}
      />
    </Submenu>
    <Divider verticalSpacer={7} horizontalSpacer={10} />
    <MenuButton
      text="Notifications"
      imageSrc="/svg/menu/notifications.svg"
      hintImageSrc="/svg/menu/tick-active.svg"
      onClick={() => menuButtonClickHandler(EnumCardActions.Notifications)}
    />
    <MenuButton
      text="Copy link"
      imageSrc="/svg/menu/copy-link.svg"
      onClick={() => menuButtonClickHandler(EnumCardActions.CopyLink)}
    />
    <MenuButton
      text="Duplicate"
      imageSrc="/svg/menu/duplicate.svg"
      onClick={() => menuButtonClickHandler(EnumCardActions.Duplicate)}
    />
    <Divider verticalSpacer={7} horizontalSpacer={10} />
    <MenuButton
      text="Add card below"
      imageSrc="/svg/menu/add-card.svg"
      onClick={() => menuButtonClickHandler(EnumCardActions.AddCardBelow)}
    />
    <Divider verticalSpacer={7} horizontalSpacer={10} />
    <MenuButton
      text="Delete"
      imageSrc="/svg/menu/delete.svg"
      hintText="⌫"
      onClick={() => menuButtonClickHandler(EnumCardActions.Delete)}
    />
  </Menu>
  ), [isEditable, isHover, color]);

  useEffect(() => {
    if (!isEditableDefault) {
      saveTodo();
    }
  }, [status]);

  const bullets = ['arrow.svg', 'dot.svg', 'dash.svg'];

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
          <img className="card__bullet" src={`/svg/card/${bullets[type - 1]}`} alt="bullet" />
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
    console.log('card');
    return (
      <div className={`card__block-wrapper 
    ${isEditable ? 'card__block-wrapper--editable' : ''}
    `}
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
          onDoubleClick={!isEditableDefault ? doubleClickHandler : () => {}}
        >
          {
              isEditable ? (
                <div
                  className="card__editable-content"
                >
                  <TextareaAutosize
                    ref={titleInputRef}
                    className="card__textarea"
                    value={titleValue}
                    placeholder="New Card"
                    minRows={1}
                    maxRows={20}
                    onChange={(event) => changeHandler(event, false)}
                    onKeyUp={(event) => keydownHandler(event, false)}
                  />
                  <TextareaAutosize
                    ref={descriptionInputRef}
                    className="card__textarea card__textarea--description"
                    value={descriptionValue}
                    placeholder="Notes"
                    minRows={1}
                    maxRows={20}
                    onChange={(event) => changeHandler(event, true)}
                    onKeyDownCapture={(event) => keydownHandler(event, true)}
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
      ${isMouseDown ? 'card--pressed' : ''}
      ${color !== undefined ? colorClass : ''}
      `}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      onClick={(e) => e.stopPropagation()}
    >
      { card }
      { contextMenu }
    </div>
  );
};
