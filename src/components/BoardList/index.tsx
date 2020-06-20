import React, { FC, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Menu } from '../Menu';
import { BoardItem } from '../BoardItem';
import { Profile } from '../Profile';
import { IRootState } from '../../store/reducers/state';

interface IBoardList {
}

export const BoardList: FC<IBoardList> = () => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [activeBoard, setIsActiveBoard] = useState<string>('board-3');
  const { boards } = useSelector((state: IRootState) => state);

  const changeBoardHandler = (id: string) => {
    console.log('active board', id);
    setIsActiveBoard(id);
  };

  const boardItems = useMemo(() => (
    boards.map(({ id, icon, title }) => (
      <BoardItem
        key={id}
        id={id}
        icon={icon}
        title={title}
        isActive={activeBoard === id}
        onClick={changeBoardHandler}
      />
    ))
  ), [boards, activeBoard]);

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
