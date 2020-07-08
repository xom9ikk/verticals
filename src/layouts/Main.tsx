import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { Sidebar } from '../components/Sidebar';
import { Columns } from '../components/Columns';
import { SystemActions } from '../store/actions';
import { Search } from '../components/Search';
import { BoardList } from '../components/BoardList';

export const Main: FC = () => {
  const dispatch = useDispatch();
  const [activeBoardId, setActiveBoardId] = useState<string>('board-2');

  const closeAllPopups = () => {
    dispatch(SystemActions.setIsOpenPopup(false));
    dispatch(SystemActions.setIsEditableCard(false));
    dispatch(SystemActions.setIsEditableColumn(false));
    dispatch(SystemActions.setIsEditableBoard(false));
    dispatch(SystemActions.setCurrentTodoId(''));
    // dispatch(BoardsActions.removeNewBoards());
  };

  const keydownHandler = (event: any) => {
    switch (event.code) {
      case 'Escape': {
        closeAllPopups();
        break;
      }
      default: break;
    }
  };

  const clickHandler = () => {
    closeAllPopups();
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
