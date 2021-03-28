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
  TodosActions, UpdatesActions, SubTodosActions,
} from '@store/actions';
import { Sidebar } from '@comp/Sidebar';
import { Search } from '@comp/Search';
import { BoardList } from '@comp/BoardList';
import { Columns } from '@comp/Columns';
import { useReadableId } from '@use/readableId';
import { redirectTo } from '@router/history';
import {
  getActiveSubTodoId,
  getActiveTodoId,
  getUsername,
} from '@store/selectors';
import { TRASH_BOARD_ID } from '@/constants';
import { useValueRef } from '@use/valueRef';
import { Gallery } from '@comp/Gallery';

interface IMainLayoutURLParams {
  boardId?: string;
  cardId?: string;
  0: 'card' | 'subcard';
}

export const MainLayout: FC = () => {
  const data = useParams<IMainLayoutURLParams>();
  const { boardId, cardId, 0: cardType } = data;

  const dispatch = useDispatch();

  const activeTodoId = useSelector(getActiveTodoId);
  const activeSubTodoId = useSelector(getActiveSubTodoId);
  const username = useSelector(getUsername);

  const refBoardId = useValueRef(boardId);
  const refActiveTodoId = useValueRef(activeTodoId);
  const refActiveSubTodoId = useValueRef(activeSubTodoId);
  const refUsername = useValueRef(username);

  const { toNumericId } = useReadableId();

  const closeEditable = () => {
    dispatch(BoardsActions.removeTemp());
    dispatch(ColumnsActions.removeTemp());
    dispatch(TodosActions.removeTemp());
    dispatch(SubTodosActions.removeTemp());
    const isCardOpened = !!refActiveTodoId.current || !!refActiveSubTodoId.current;
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
    let numericCardId = null;
    if (cardId) {
      numericCardId = toNumericId(cardId);
      switch (cardType) {
        case 'card': {
          dispatch(SystemActions.setActiveTodoReadableId(cardId));
          break;
        }
        case 'subcard': {
          dispatch(SystemActions.setActiveSubTodoReadableId(cardId));
          break;
        }
        default: break;
      }
    }
    switch (cardType) {
      case 'card': {
        dispatch(SystemActions.setActiveTodoId(numericCardId));
        dispatch(SystemActions.setActiveSubTodoId(null));
        break;
      }
      case 'subcard': {
        dispatch(SystemActions.setActiveTodoId(null));
        dispatch(SystemActions.setActiveSubTodoId(numericCardId));
        break;
      }
      default: {
        dispatch(SystemActions.setActiveSubTodoId(null));
        dispatch(SystemActions.setActiveTodoId(null));
        break;
      }
    }
  }, [cardId]);

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
