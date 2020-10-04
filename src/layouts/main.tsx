/* eslint-disable no-nested-ternary */
import React, {
  FC, Ref, useEffect, useMemo, useRef,
} from 'react';
import { RouteWrapper } from '@/router/router';
import { SettingsLayout } from '@/layouts/Settings';
import { SuspenseWrapper } from '@comp/SuspenseWrapper';
import { Route, Switch } from 'react-router-dom';
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
import { forwardTo } from '@/router/history';

const { toNumericId } = useReadableId();

// @ts-ignore
export const MainLayout: FC = ({ match }) => {
  const dispatch = useDispatch();
  const refBoardId = useRef<Ref<string>>();

  const { boardId, todoId } = match.params;

  console.log('math', match.params);
  const numericBoardId = boardId === 'trash'
    ? -1
    : boardId !== undefined
      && !['account', 'profile'].includes(boardId)
      ? toNumericId(boardId)
      : null;
  console.log('numericBoardId', numericBoardId);

  const numericTodoId = todoId !== undefined ? toNumericId(todoId) : null;
  refBoardId.current = boardId;

  dispatch(SystemActions.setActiveBoardReadableId(boardId));
  dispatch(SystemActions.setActiveBoardId(numericBoardId));
  dispatch(SystemActions.setActiveTodoId(numericTodoId));

  useEffect(() => {
    dispatch(BoardsActions.fetchAll());
  }, []);

  const closeAllPopups = () => {
    // TODO: refactor this. useOutsideClick
    console.log('closeAllPopups');
    dispatch(SystemActions.setIsOpenPopup(false));
    dispatch(SystemActions.setIsEditableCard(false));
    dispatch(SystemActions.setIsEditableColumn(false));
    dispatch(SystemActions.setIsEditableBoard(false));
    forwardTo(`/userId/${refBoardId.current}`);
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
    console.log('clickHandler', event);
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
    <Switch>
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
    </Switch>
  ), []);

  return (
    <div className="container container--horizontal">
      { memoSidebar }
      { memoRouter }
    </div>
  );
};
