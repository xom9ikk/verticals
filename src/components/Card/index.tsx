import React, { FC, useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from '../Menu';
import { Checkbox } from '../Checkbox';
import { ColorPicker } from '../ColorPicker';
import { MenuButton } from '../MenuButton';
import { Divider } from '../Divider';
import { Submenu } from '../Submenu';
import { SystemActions } from '../../store/actions';
import { IRootState } from '../../store/reducers/state';

interface ICard {
  title?: string;
  description?: string;
  isDone?: boolean;
  isEditableDefault?: boolean;
  onExitFromEditable?: () => void;
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
  title,
  description,
  isDone = false,
  isEditableDefault,
  onExitFromEditable,
  provided,
  snapshot,
}) => {
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isDoubleClicked, setIsDoubleClicked] = useState<boolean>();
  const { isEditableCard } = useSelector((state: IRootState) => state.system);

  useEffect(() => {
    if (isDoubleClicked) {
      setIsDoubleClicked(false);
      dispatch(SystemActions.setIsEditableCard(true));
      if (!isEditableCard && isDoubleClicked) {
        setIsEditable(true);
      }
    }
  }, [isDoubleClicked]);

  useEffect(() => {
    if (isDoubleClicked === false && !isEditableCard) {
      setIsEditable(false);
      onExitFromEditable?.();
    }
  }, [isEditableCard]);

  const doubleClickHandler = () => {
    if (isEditableCard) {
      dispatch(SystemActions.setIsEditableCard(false));
      if (isEditable) {
        setIsEditable(false);
        onExitFromEditable?.();
      }
    }
    if (!isEditable) {
      setIsDoubleClicked(true);
    }
  };

  useEffect(() => {
    if (isEditableDefault) {
      doubleClickHandler();
    }
  }, [isEditableDefault]);

  return (
    <div
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      className={`card 
      ${snapshot?.isDragging ? 'card--draggable' : ''}
      ${isEditable ? 'card__editable' : ''}
      `}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onDoubleClick={!isEditableDefault ? doubleClickHandler : null}
    >
      <div className="card__block">
        <Checkbox isActiveDefault={isDone} />
        {
          isEditable ? (
            <div className="card__editable-content">
              <TextareaAutosize
                className="card__textarea"
                defaultValue={title}
                placeholder="New Card"
                minRows={1}
                maxRows={4}
              />
              <TextareaAutosize
                className="card__textarea card__textarea--description"
                defaultValue={description}
                placeholder="Notes"
                minRows={1}
                maxRows={4}
              />
            </div>
          ) : (<span>{title}</span>
          )
        }

      </div>
      {
        !isEditable && (
        <Menu
          imageSrc="/svg/dots.svg"
          alt="menu"
          imageSize={22}
          size={24}
          isHide
          isHoverBlock={isHover}
          position="right"
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
        )
      }
    </div>
  );
};
