import React, { FC, useMemo, useState } from 'react';
import { Menu } from '../Menu';
import { BoardItem } from '../BoardItem';
import { Profile } from '../Profile';

interface IBoardList {
}

export const BoardList: FC<IBoardList> = () => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [activeBoard, setIsActiveBoard] = useState<string>('id3');

  const items = [{
    id: 'id1',
    icon: '/svg/board/star.svg',
    text: 'Today',
  }, {
    id: 'id2',
    icon: '/svg/board/item.svg',
    text: 'To reading',
  }, {
    id: 'id3',
    icon: '/svg/board/item.svg',
    text: 'Technologies etc.',
  }, {
    id: 'id4',
    icon: '/svg/board/item.svg',
    text: 'Projects',
  }, {
    id: 'id5',
    icon: '/svg/board/item.svg',
    text: 'Branches',
  }, {
    id: 'id6',
    icon: '/svg/board/item.svg',
    text: 'Films',
  }, {
    id: 'id7',
    icon: '/svg/board/item.svg',
    text: 'Buy',
  }, {
    id: 'id8',
    icon: '/svg/board/item.svg',
    text: 'Books',
  }, {
    id: 'trash',
    icon: '/svg/board/trash.svg',
    text: 'Trash',
  }];

  const changeBoardHandler = (id: string) => {
    console.log('active board', id);
    setIsActiveBoard(id);
  };

  const boardItems = useMemo(() => (
    items.map(({ id, icon, text }) => (
      <BoardItem
        key={id}
        id={id}
        icon={icon}
        text={text}
        isActive={activeBoard === id}
        onClick={changeBoardHandler}
      />
    ))
  ), [items]);

  const profile = useMemo(() => (
    <Profile />
  ), []);

  return (
    <div
      className="board-list"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {profile}
      {boardItems}
      <Menu
        imageSrc="/svg/add.svg"
        alt="add"
        text="Add board"
        isHide
        isHoverBlock={isHover}
        isMaxWidth
      />
    </div>
  );
};
