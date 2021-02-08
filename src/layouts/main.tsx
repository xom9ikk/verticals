/* eslint-disable no-nested-ternary */
import React, {
  FC, useEffect, useMemo, useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useParams } from 'react-router-dom';
import { RouteWrapper } from '@router/router';
import { SettingsLayout } from '@layouts/Settings';
import { SuspenseWrapper } from '@comp/SuspenseWrapper';
import { Account } from '@pages/settings/Account';
import { Profile } from '@pages/settings/Profile';
import {
  SystemActions,
  BoardsActions,
  // ColumnsActions,
  // TodosActions,
  UserActions,
} from '@store/actions';
import { Sidebar } from '@comp/Sidebar';
import { Search } from '@comp/Search';
import { BoardList } from '@comp/BoardList';
import { Columns } from '@comp/Columns';
import { useReadableId } from '@use/readableId';
import { forwardTo } from '@router/history';
import { getActiveBoardId, getActiveTodoId, getUsername } from '@store/selectors';
import { TRASH_BOARD_ID } from '@/constants';

// @ts-ignore
export const MainLayout: FC<{}> = () => {
  const { boardId, todoId } = useParams();

  const dispatch = useDispatch();

  const activeBoardId = useSelector(getActiveBoardId);
  const activeTodoId = useSelector(getActiveTodoId);
  const username = useSelector(getUsername);

  const { toNumericId } = useReadableId();
  const refBoardId = useRef(boardId);
  const refActiveTodoId = useRef(activeTodoId);
  const refUsername = useRef(username);

  useEffect(() => {
    const numericBoardId = boardId === 'trash'
      ? TRASH_BOARD_ID
      : boardId !== undefined
        && !['account', 'profile'].includes(boardId)
        ? toNumericId(boardId)
        : null;
    console.log('numericBoardId', numericBoardId);
    dispatch(SystemActions.setActiveBoardId(numericBoardId));
    dispatch(SystemActions.setActiveBoardReadableId(boardId));
  }, [boardId]);

  useEffect(() => {
    const numericTodoId = todoId !== undefined ? toNumericId(todoId) : null;
    dispatch(SystemActions.setActiveTodoId(numericTodoId));
    dispatch(SystemActions.setActiveTodoReadableId(todoId)); // delete?
  }, [todoId]);

  useEffect(() => {
    dispatch(UserActions.fetchMe());
    dispatch(BoardsActions.fetchAll());
  }, []);

  const closePopupsAndEditable = () => {
    console.log('closePopupsAndEditable');
    dispatch(SystemActions.setIsOpenPopup(false));
    dispatch(SystemActions.setIsEditableCard(false));
    dispatch(SystemActions.setIsEditableColumn(false));
    dispatch(SystemActions.setIsEditableBoard(false));
    // dispatch(BoardsActions.removeTemp()); // TODO: fix
    // dispatch(ColumnsActions.removeTemp()); // TODO: fix
    // dispatch(TodosActions.removeTemp()); // TODO: fix
    const isCardOpened = !!refActiveTodoId.current;
    if (isCardOpened) {
      forwardTo(`/${refUsername.current}/${refBoardId.current}`);
    }
  };

  const keydownHandler = (event: any) => {
    switch (event.code) {
      case 'Escape': {
        closePopupsAndEditable();
        break;
      }
      default: break;
    }
  };

  const clickHandler = (event: any) => {
    if (event.isTrusted) closePopupsAndEditable();
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
  ), [activeBoardId]);

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
