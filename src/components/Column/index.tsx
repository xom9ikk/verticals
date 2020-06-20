import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import {
  DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided, DropResult,
} from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { Menu } from '../Menu';
import { Card } from '../Card';
import { CardToolbar } from '../CardToolbar';
import { MenuButton } from '../MenuButton';
import { Divider } from '../Divider';
import { IRootState } from '../../store/reducers/state';

interface IColumn {
  index: number;
  columnId: string;
  title: string;
  description: string;
  todos: Array<{
    id: string;
    title: string;
    isDone: boolean;
  }>;
}

export const Column: FC<IColumn> = ({
  index, columnId, title, description, todos,
}) => {
  const [isOpenNewCard, setIsOpenNewCard] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isHoverHeader, setIsHoverHeader] = useState<boolean>(false);

  const exitFromCardEditableHandler = (newTitle: string, newDescription: string, id?: string) => {
    console.log('id', id, '->', newTitle, '->', newDescription);
    setIsOpenNewCard(false);
  };

  const todoCards = useMemo(() => (
    <Droppable
      droppableId={columnId}
      type="QUOTE"
    >
      {
            (dropProvided,
              droppableSnapshot) => (
                <div
                  ref={dropProvided.innerRef}
                  style={{ minHeight: 36 }}
                >
                  {
                    todos.map((todo, todoIndex) => (
                      <Draggable
                        key={todo.id}
                        draggableId={todo.id}
                        index={todoIndex}
                      >
                        {(
                          dragProvided: DraggableProvided,
                          dragSnapshot: DraggableStateSnapshot,
                        ) => (
                          <Card
                            provided={dragProvided}
                            snapshot={dragSnapshot}
                            key={todo.id}
                            title={todo.title}
                            isDone={todo.isDone}
                            onExitFromEditable={
                              (t, d) => exitFromCardEditableHandler(t, d, todo.id)
                            }
                          />
                        )}
                      </Draggable>
                    ))
                  }
                  {dropProvided.placeholder}
                </div>
            )
          }
    </Droppable>
  ), [todos, columnId, exitFromCardEditableHandler]);

  const contextMenu = useMemo(() => (
    <Menu
      imageSrc="/svg/dots.svg"
      alt="menu"
      imageSize={22}
      size={24}
      isHide
      isHoverBlock={isHover}
      position="bottom"
    >
      <MenuButton
        text="Edit column"
        imageSrc="/svg/menu/edit.svg"
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuButton
        text="Duplicate"
        imageSrc="/svg/menu/duplicate.svg"
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuButton
        text="Add card"
        imageSrc="/svg/menu/add-card.svg"
      />
      <MenuButton
        text="Add heading"
        imageSrc="/svg/menu/add-heading.svg"
      />
      <MenuButton
        text="Add column after"
        imageSrc="/svg/menu/add-column.svg"
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuButton
        text="Delete"
        imageSrc="/svg/menu/delete.svg"
        hintText="⌫"
      />
    </Menu>
  ), [isHover]);

  const addCard = useMemo(() => (
    !isOpenNewCard && (
    <Menu
      imageSrc="/svg/add.svg"
      alt="add"
      text="Add card"
      isHide
      isHoverBlock={isHover}
      isMaxWidth
      isShowPopup={false}
      onClick={() => setIsOpenNewCard(true)}
    />
    )
  ), [isHover, isOpenNewCard]);

  const newCard = useMemo(() => (
    isOpenNewCard && (
    <Card
      isEditableDefault
      onExitFromEditable={(t, d) => exitFromCardEditableHandler(t, d)}
    />
    )
  ), [isOpenNewCard, exitFromCardEditableHandler]);

  const cardToolbar = useMemo(() => (
    <CardToolbar
      isHoverBlock={isHover}
      onClickCard={() => setIsOpenNewCard(true)}
      onClickHeading={() => console.log('open heading')}
    />
  ), [isHover]);

  const column = useMemo(() => (
    <Draggable draggableId={title} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          className="column"
          ref={provided.innerRef}
          {...provided.draggableProps}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div
            className={`column__wrapper
            ${isHoverHeader ? 'column__wrapper--hovered' : ''}
            ${snapshot.isDragging ? 'column__wrapper--dragging' : ''}
            `}
          >
            <div
              className="column__header"
              {...provided.dragHandleProps}
              aria-label={`${title} quote list`}
              onMouseEnter={() => setIsHoverHeader(true)}
              onMouseLeave={() => setIsHoverHeader(false)}
            >
              <div
                className="column__title-container"
              >
                <TextareaAutosize
                  className="column__title-editable"
                  defaultValue={title}
                  placeholder="New Column"
                  minRows={1}
                />
                { (title || description || todos.length) ? contextMenu : null}
              </div>
              <TextareaAutosize
                className="column__description-editable"
                defaultValue={description}
                minRows={1}
                placeholder="Notes"
              />
            </div>
            { todoCards }
            { newCard }
            { addCard }
          </div>
          { cardToolbar }
        </div>
      )}
    </Draggable>
  ),
  [todos, columnId, isHover, isHoverHeader, isOpenNewCard]);

  return (
    <>{column}</>
  );
};
