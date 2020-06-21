import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sidebar } from '../components/Sidebar';
import { Columns } from '../components/Columns';
import { SystemActions } from '../store/actions';
import { IRootState } from '../store/reducers/state';
import { Search } from '../components/Search';
import { BoardList } from '../components/BoardList';
import { Toolbar } from '../components/Toolbar';

export const Main: FC = () => {
  const dispatch = useDispatch();
  const [activeBoardId, setActiveBoardId] = useState<string>('board-3');

  // useEffect(() => {
  //   const data = {};
  //   columns
  //     ?.filter((column) => column.boardId === activeBoardId)
  //     ?.forEach((column) => {
  //       // @ts-ignore
  //       data[column.id] = {
  //         title: column.title,
  //         description: column.description,
  //         todos: todos.filter((todo) => todo.columnId === column.id),
  //       };
  //     });
  //   console.log(data);
  //   setPreparedData(data);
  // }, [todos,
  //   // TODO: need?
  //   columns,
  //   activeBoardId]);

  const keydownHandler = (event: any) => {
    switch (event.code) {
      case 'Escape': {
        dispatch(SystemActions.setIsOpenPopup(false));
        dispatch(SystemActions.setIsEditableCard(false));
        break;
      }
      default: break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, []);

  const memoSidebar = useMemo(() => (
    <Sidebar>
      <Search />
      <BoardList
        activeBoard={activeBoardId}
        onChange={setActiveBoardId}
      />
      <Toolbar />
    </Sidebar>
  ), [activeBoardId]);

  const memoColumns = useMemo(() => (
    <Columns
      boardId={activeBoardId}
    />
  ), [activeBoardId]);

  return (
    <div className="container container--horizontal">
      { memoSidebar }
      { memoColumns }
    </div>
  );
};
