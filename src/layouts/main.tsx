/* eslint-disable no-nested-ternary */
import React, {
  FC, useEffect, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useParams } from 'react-router-dom';
import useKeys from '@rooks/use-keys';
import { RouteWrapper } from '@router/router';
import { SettingsLayout } from '@layouts/Settings';
import { SuspenseWrapper } from '@comp/SuspenseWrapper';
import { Account } from '@pages/settings/Account';
import { Profile } from '@pages/settings/Profile';
import {
  SystemActions,
  BoardsActions,
  UserActions,
  ColumnsActions,
  TodosActions, UpdatesActions,
} from '@store/actions';
import { Sidebar } from '@comp/Sidebar';
import { Search } from '@comp/Search';
import { BoardList } from '@comp/BoardList';
import { Columns } from '@comp/Columns';
import { useReadableId } from '@use/readableId';
import { redirectTo } from '@router/history';
import {
  getActiveTodoId,
  getUsername,
} from '@store/selectors';
import { TRASH_BOARD_ID } from '@/constants';
import { useValueRef } from '@use/valueRef';
import { Gallery } from '@comp/Gallery';

interface IMainLayoutURLParams {
  boardId?: string;
  todoId?: string;
}

export const MainLayout: FC = () => {
  const { boardId, todoId } = useParams<IMainLayoutURLParams>();

  const dispatch = useDispatch();

  const activeTodoId = useSelector(getActiveTodoId);
  const username = useSelector(getUsername);

  const refBoardId = useValueRef(boardId);
  const refActiveTodoId = useValueRef(activeTodoId);
  const refUsername = useValueRef(username);

  const { toNumericId } = useReadableId();

  const closeEditable = () => {
    dispatch(BoardsActions.removeTemp());
    dispatch(ColumnsActions.removeTemp());
    dispatch(TodosActions.removeTemp());
    const isCardOpened = !!refActiveTodoId.current;
    if (isCardOpened) {
      redirectTo(`/${refUsername.current}/${refBoardId.current}`);
    }
  };

  useKeys(['Escape'], closeEditable);

  useEffect(() => {
    if (boardId) {
      const numericBoardId = boardId === 'trash'
        ? TRASH_BOARD_ID
        : boardId !== undefined
          && !['account', 'profile'].includes(boardId)
          ? toNumericId(boardId)
          : null;
      dispatch(SystemActions.setActiveBoardId(numericBoardId));
      dispatch(SystemActions.setActiveBoardReadableId(boardId));
    }
  }, [boardId]);

  useEffect(() => {
    let numericTodoId = null;
    if (todoId) {
      numericTodoId = toNumericId(todoId);
      dispatch(SystemActions.setActiveTodoReadableId(todoId)); // not use?
    }
    dispatch(SystemActions.setActiveTodoId(numericTodoId));
  }, [todoId]);

  useEffect(() => {
    dispatch(UserActions.effect.fetchMe());
    dispatch(BoardsActions.effect.fetchAll());
    dispatch(UpdatesActions.effect.subscribe());
  }, []);

  const memoSidebar = useMemo(() => (
    <Sidebar>
      <Search />
      <BoardList />
    </Sidebar>
  ), []);

  const memoRouter = useMemo(() => (
    <Switch>
      <RouteWrapper
        path="/settings/account"
        layout={SettingsLayout}
        component={() => <SuspenseWrapper component={Account} />}
        isPrivate
        exact
      />
      <RouteWrapper
        path="/settings/profile"
        layout={SettingsLayout}
        component={() => <SuspenseWrapper component={Profile} />}
        isPrivate
        exact
      />
      <Route
        path="/"
        component={Columns}
      />
    </Switch>
  ), []);

  const memoGallery = useMemo(() => <Gallery />, []);

  return (
    <div className="container container--horizontal">
      { memoSidebar }
      { memoRouter }
      { memoGallery }
    </div>
  );
};
