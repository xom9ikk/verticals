/* eslint-disable no-nested-ternary */
import React, {
  FC, useEffect, useMemo,
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
  UserActions,
  ColumnsActions,
  TodosActions,
} from '@store/actions';
import { Sidebar } from '@comp/Sidebar';
import { Search } from '@comp/Search';
import { BoardList } from '@comp/BoardList';
import { Columns } from '@comp/Columns';
import { useReadableId } from '@use/readableId';
import { redirectTo } from '@router/history';
import {
  getActiveBoardId,
  getActiveTodoId,
  getUsername,
} from '@store/selectors';
import { TRASH_BOARD_ID } from '@/constants';
import { useValueRef } from '@use/valueRef';
import useKeys from '@rooks/use-keys';

interface IMainLayoutURLParams {
  boardId?: string;
  todoId?: string;
}

export const MainLayout: FC = () => {
  const { boardId, todoId } = useParams<IMainLayoutURLParams>();

  const dispatch = useDispatch();

  const activeBoardId = useSelector(getActiveBoardId);
  const activeTodoId = useSelector(getActiveTodoId);
  const username = useSelector(getUsername);

  const refBoardId = useValueRef(boardId);
  const refActiveTodoId = useValueRef(activeTodoId);
  const refUsername = useValueRef(username);

  const { toNumericId } = useReadableId();

  const closePopups = () => {
    // dispatch(SystemActions.setIsOpenPopup(false));
    // dispatch(SystemActions.setEditableCardId(false));
    // dispatch(SystemActions.setEditableColumnId(null));
    // dispatch(SystemActions.setEditableBoardId(false));
  };

  const closePopupsAndEditable = () => {
    closePopups();
    dispatch(BoardsActions.removeTemp());
    dispatch(ColumnsActions.removeTemp());
    dispatch(TodosActions.removeTemp());
    const isCardOpened = !!refActiveTodoId.current;
    if (isCardOpened) {
      redirectTo(`/${refUsername.current}/${refBoardId.current}`);
    }
  };

  // const handleClick = (event: any) => {
  //   if (event.isTrusted) closePopups(); // TODO: fix useOutsideClick for close board/card/column
  // };

  useKeys(['Escape'], closePopupsAndEditable); // TODO: uncomment

  useEffect(() => {
    if (boardId) {
      const numericBoardId = boardId === 'trash'
        ? TRASH_BOARD_ID
        : boardId !== undefined
          && !['account', 'profile'].includes(boardId)
          ? toNumericId(boardId)
          : null;
      console.log('numericBoardId', numericBoardId);
      dispatch(SystemActions.setActiveBoardId(numericBoardId));
      dispatch(SystemActions.setActiveBoardReadableId(boardId));
    }
  }, [boardId]);

  useEffect(() => {
    let numericTodoId = null;
    if (todoId) {
      numericTodoId = toNumericId(todoId);
      dispatch(SystemActions.setActiveTodoReadableId(todoId)); // delete?
    }
    dispatch(SystemActions.setActiveTodoId(numericTodoId));
  }, [todoId]);

  useEffect(() => {
    dispatch(UserActions.effect.fetchMe());
    dispatch(BoardsActions.effect.fetchAll());
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
