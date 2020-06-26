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
  const [activeBoardId, setActiveBoardId] = useState<string>('board-2');

  const keydownHandler = (event: any) => {
    switch (event.code) {
      case 'Escape': {
        dispatch(SystemActions.setIsOpenPopup(false));
        dispatch(SystemActions.setIsEditableCard(false));
        dispatch(SystemActions.setIsEditableColumn(false));
        dispatch(SystemActions.setIsEditableBoard(false));
        break;
      }
      default: break;
    }
  };

  const clickHandler = () => {
    dispatch(SystemActions.setIsOpenPopup(false));
    dispatch(SystemActions.setIsEditableCard(false));
    dispatch(SystemActions.setIsEditableColumn(false));
    dispatch(SystemActions.setIsEditableBoard(false));
  };

  useEffect(() => {
    window.addEventListener('keydown', keydownHandler);
    window.addEventListener('click', clickHandler);
    return () => {
      window.removeEventListener('keydown', keydownHandler);
      window.removeEventListener('click', clickHandler);
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
