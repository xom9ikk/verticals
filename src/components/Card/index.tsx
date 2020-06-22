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
import { SystemActions } from '../../store/actions';
import { IRootState } from '../../store/reducers/state';
import { useFocus } from '../../use/focus';

interface ICard {
  title?: string;
  description?: string;
  isDone?: boolean;
  isEditableDefault?: boolean;
  onExitFromEditable?: (title?: string, description?: string, isDone?: boolean) => void;
  provided?: any;
  snapshot?: any;
}

// TODO: move to constants
// TODO: interfaces for todos
const colors = [
  '#ff6a56',
  '#fee930',
  '#9cc447',
  '#32dabc',
  '#5fc1e9',
  '#d8d8d8',
];

export const Card: FC<ICard> = ({
  title: initialTitle = '',
  description: initialDescription = '',
  isDone: initialIsDone = false,
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
  const { isEditableCard } = useSelector((state: IRootState) => state.system);
  const [titleValue, setTitleValue] = useState<string>(initialTitle);
  const [descriptionValue, setDescriptionValue] = useState<string>(initialDescription);
  const [isDone, setIsDone] = useState<boolean>(initialIsDone);
  const titleInputRef = useRef<any>(null);
  const descriptionInputRef = useRef<any>(null);

  const getNewData = () => ({
    newTitle: initialTitle !== titleValue ? titleValue.trim() : undefined,
    newDescription: initialDescription !== descriptionValue ? descriptionValue.trim() : undefined,
    newIsDone: initialIsDone !== isDone ? isDone : undefined,
  });

  const sendData = () => {
    const { newTitle, newDescription, newIsDone } = getNewData();
    onExitFromEditable?.(newTitle, newDescription, newIsDone);
  };

  useEffect(() => {
    if (isDoubleClicked) {
      setIsDoubleClicked(false);
      console.log('double click setIsEditableCard', true);
      dispatch(SystemActions.setIsEditableCard(true));
      if (!isEditableCard && isDoubleClicked) {
        setIsEditable(true);
      }
    }
  }, [isDoubleClicked, isEditableCard]);

  useEffect(() => {
    if (isDoubleClicked === false && !isEditableCard && isEditable) {
      setIsEditable(false);
      sendData();
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
      //   sendData();
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
        sendData();
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

  const debouncePress = useCallback(
    debounce((isPress: boolean) => setIsMouseDown(isPress), 300),
    [],
  );

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
    <ColorPicker colors={colors} onClick={console.log} />
    <MenuButton
      text="Edit card"
      imageSrc="/svg/menu/edit.svg"
    />
    <MenuButton
      text="Attach file"
      imageSrc="/svg/menu/attach.svg"
    />
    <MenuButton
      text="Add date"
      imageSrc="/svg/menu/add-date.svg"
    />
    <Submenu
      text="Complete"
      imageSrc="/svg/menu/complete.svg"
    >
      <MenuButton
        text="Mark as to do"
        imageSrc="/svg/menu/rounded-square.svg"
      />
      <MenuButton
        text="Mark as doing"
        imageSrc="/svg/menu/rounded-square-half-filled.svg"
      />
      <MenuButton
        text="Mark as done"
        imageSrc="/svg/menu/rounded-square-check.svg"
      />
    </Submenu>
    <Divider verticalSpacer={7} horizontalSpacer={10} />
    <MenuButton
      text="Notifications"
      imageSrc="/svg/menu/notifications.svg"
      hintImageSrc="/svg/menu/tick.svg"
    />
    <MenuButton
      text="Copy link"
      imageSrc="/svg/menu/copy-link.svg"
    />
    <MenuButton
      text="Duplicate"
      imageSrc="/svg/menu/duplicate.svg"
    />
    <Divider verticalSpacer={7} horizontalSpacer={10} />
    <MenuButton
      text="Add card below"
      imageSrc="/svg/menu/add-card.svg"
    />
    <Divider verticalSpacer={7} horizontalSpacer={10} />
    <MenuButton
      text="Delete"
      imageSrc="/svg/menu/delete.svg"
      hintText="⌫"
    />
  </Menu>
  ), [isEditable, isHover]);

  const card = useMemo(() => (
    <div className={`card__block-wrapper ${isEditable ? 'card__block-wrapper--editable' : ''}`}>
      <Checkbox
        isActive={isDone}
        onClick={() => setIsDone((prev) => !prev)}
        style={{ marginTop: 10, marginBottom: 10 }}
      />
      <div
        className="card__block"
        onMouseDown={() => (!isEditable ? debouncePress(true) : null)}
        onMouseUp={() => (!isEditable ? debouncePress(false) : null)}
        onTouchStart={() => (!isEditable ? debouncePress(true) : null)}
        onTouchEnd={() => (!isEditable ? debouncePress(false) : null)}
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
  ), [
    isDone, isEditable, isEditableCard, isEditableDefault,
    titleInputRef, titleValue,
    descriptionInputRef, descriptionValue,
    onExitFromEditable,
  ]);

  useEffect(() => {
    if (!snapshot?.isDragging) {
      setIsMouseDown(false);
    }
  }, [snapshot?.isDragging]);

  return (
    <div
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      className={`card 
      ${snapshot?.isDragging ? 'card--dragging' : ''}
      ${isEditable ? 'card--editable' : ''}
      ${isMouseDown ? 'card--pressed' : ''}
      `}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      { card }
      { contextMenu }
    </div>
  );
};