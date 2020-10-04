/* eslint-disable no-nested-ternary */
import React, {
  FC, useEffect, useMemo,
} from 'react';
import { RouteWrapper } from '@/router/router';
import { SettingsLayout } from '@/layouts/Settings';
import { SuspenseWrapper } from '@comp/SuspenseWrapper';
import { Route } from 'react-router-dom';
import { Account } from '@/pages/settings/Account';
import { Profile } from '@/pages/settings/Profile';
import { useDispatch } from 'react-redux';
import {
  BoardsActions, ColumnsActions, SystemActions, TodosActions,
} from '@/store/actions';
import { Sidebar } from '@comp/Sidebar';
import { Search } from '@comp/Search';
import { BoardList } from '@comp/BoardList';
import { Columns } from '@comp/Columns';
import { useReadableId } from '@/use/readableId';

const { toNumericId } = useReadableId();

// @ts-ignore
export const MainLayout: FC = ({ match }) => {
  const dispatch = useDispatch();

  const { boardId } = match.params;
  const numericBoardId = boardId === 'trash'
    ? -1
    : boardId !== undefined
      ? toNumericId(boardId)
      : null;
  dispatch(SystemActions.setActiveBoardId(numericBoardId));

  useEffect(() => {
    dispatch(BoardsActions.fetchAll());
  }, []);

  const closeAllPopups = () => {
    dispatch(SystemActions.setIsOpenPopup(false));
    dispatch(SystemActions.setIsEditableCard(false));
    dispatch(SystemActions.setIsEditableColumn(false));
    dispatch(SystemActions.setIsEditableBoard(false));
    dispatch(SystemActions.setCurrentTodoId(null));
    dispatch(BoardsActions.removeTemp());
    dispatch(ColumnsActions.removeTemp());
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
    if (event.isTrusted) closeAllPopups();
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
      <BoardList />
    </Sidebar>
  ), [numericBoardId]);

  const memoRouter = useMemo(() => (
    <>
      <RouteWrapper
        path="/settings/account"
        layout={SettingsLayout}
        component={() => <SuspenseWrapper component={Account} />}
        isPrivate
        redirectPath="/auth/login"
        exact
      />
      <RouteWrapper
        path="/settings/profile"
        layout={SettingsLayout}
        component={() => <SuspenseWrapper component={Profile} />}
        isPrivate
        redirectPath="/auth/login"
        exact
      />
      <Route
        path="/"
        component={() => <Columns />}
      />
    </>
  ), []);

  return (
    <div className="container container--horizontal">
      { memoSidebar }
      { memoRouter }
    </div>
  );
};
