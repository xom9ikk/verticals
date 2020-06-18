import React, { FC, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Menu } from '../Menu';
import { Card } from '../Card';
import { CardToolbar } from '../CardToolbar';
import { MenuButton } from '../MenuButton';
import { Divider } from '../Divider';

interface IColumn {
  title: string;
  description: string;
  todos: Array<{
    id: string;
    title: string;
    isDone: boolean;
  }>;
}

export const Column: FC<IColumn> = ({ title, description, todos }) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isHoverHeader, setIsHoverHeader] = useState<boolean>(false);

  return (
    <div
      className="column"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className={`column__wrapper ${isHoverHeader ? 'column__wrapper--hovered' : ''}`}
      >
        <div
          className="column__header"
          onMouseEnter={() => setIsHoverHeader(true)}
          onMouseLeave={() => setIsHoverHeader(false)}
        >
          <div className="column__title-container">
            <TextareaAutosize
              className="column__title-editable"
              defaultValue={title}
              placeholder="New Column"
              minRows={1}
            />
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
          </div>
          <TextareaAutosize
            className="column__description-editable"
            defaultValue={description}
            minRows={1}
            placeholder="Notes"
          />
        </div>
        {
          todos.map(({ id, title: cardTitle, isDone }) => (
            <Card
              key={id}
              title={cardTitle}
              isDone={isDone}
            />
          ))
        }
        <Menu
          imageSrc="/svg/add.svg"
          alt="add"
          text="Add card"
          isHide
          isHoverBlock={isHover}
          isMaxWidth
        />
      </div>
      <CardToolbar isHoverBlock={isHover} />
    </div>
  );
};
