import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sidebar } from '@comp/Sidebar';
import { Columns } from '@comp/Columns';
import {
  BoardsActions, SystemActions, TodosActions,
} from '@/store/actions';
import { Search } from '@comp/Search';
import { BoardList } from '@comp/BoardList';
// import { FallbackLoader } from '@comp/FallbackLoader';
import { IRootState } from '@/store/reducers/state';

export const Main: FC = () => {
  const dispatch = useDispatch();
  const [activeBoardId, setActiveBoardId] = useState<number>();
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const { boards } = useSelector((state: IRootState) => state);

  useEffect(() => {
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 1000);
    dispatch(BoardsActions.fetchAll());
  }, []);

  useEffect(() => {
    if (boards.length) {
      console.log('boards change');
      if (activeBoardId === undefined) {
        setActiveBoardId(boards[0].id);
      }
    }
  }, [boards]);

  const closeAllPopups = () => {
    dispatch(SystemActions.setIsOpenPopup(false));
    dispatch(SystemActions.setIsEditableCard(false));
    dispatch(SystemActions.setIsEditableColumn(false));
    dispatch(SystemActions.setIsEditableBoard(false));
    dispatch(SystemActions.setCurrentTodoId(null));
    dispatch(BoardsActions.removeTemp());
    // dispatch(ColumnsActions.removeTemp());
    dispatch(TodosActions.removeTemp());
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

  const clickHandler = (event: any) => {
    console.log('event', event);
    if (event.isTrusted) closeAllPopups();
  };

  useEffect(() => {
    console.log('set handlers');
    window.addEventListener('keydown', keydownHandler);
    window.addEventListener('click', clickHandler);
    return () => {
      console.log('remove handlers');
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
    <>
      { memoSidebar }
      { memoColumns }
      {/* <FallbackLoader isFixed isLoading={isLoading} /> */}
    </>
  );
};
