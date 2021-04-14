/* eslint-disable no-nested-ternary */
import useKeys from '@rooks/use-keys';
import React, {
  FC, Suspense, useEffect, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useParams } from 'react-router-dom';

import { TRASH_BOARD_ID } from '@/constants';
import { Boards } from '@comp/Boards';
import { Columns } from '@comp/Columns';
import { DocumentTitle } from '@comp/DocumentTitle';
import { Gallery } from '@comp/Gallery';
import { Search } from '@comp/Search';
import { Sidebar } from '@comp/Sidebar';
import { redirectTo } from '@router/history';
import { lazy } from '@router/lazy';
import { RouteWrapper } from '@router/router';
import {
  BoardsActions,
  ColumnsActions,
  SubTodosActions,
  SystemActions,
  TodosActions, UpdatesActions, UserActions,
} from '@store/actions';
import {
  getActiveSubTodoId,
  getActiveTodoId,
  getUsername,
} from '@store/selectors';
import { useReadableId } from '@use/readableId';
import { useValueRef } from '@use/valueRef';

const SettingsLayout = lazy(() => import('@layouts/Settings'), (module) => module.SettingsLayout);
const Account = lazy(() => import('@pages/settings/Account'), (module) => module.Account);
const Profile = lazy(() => import('@pages/settings/Profile'), (module) => module.Profile);

interface IMainLayoutURLParams {
  boardId?: string;
  cardId?: string;
  0: 'card' | 'subcard';
}

export const MainLayout: FC = React.memo(() => {
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

    return () => {
      dispatch(SystemActions.setActiveBoardId(null));
    };
  }, []);

  const memoSidebar = useMemo(() => (
    <Sidebar>
      <Search />
      <Boards />
    </Sidebar>
  ), []);

  const memoRouter = useMemo(() => (
    <Suspense fallback={<></>}>
      <Switch>
        <RouteWrapper
          path="/settings/account"
          layout={SettingsLayout}
          component={Account}
          isPrivate
          exact
        />
        <RouteWrapper
          path="/settings/profile"
          layout={SettingsLayout}
          component={Profile}
          isPrivate
          exact
        />
        <Route
          path="/"
          component={Columns}
        />
      </Switch>
    </Suspense>
  ), []);

  const memoGallery = useMemo(() => <Gallery />, []);

  const memoDocumentTitle = useMemo(() => <DocumentTitle />, []);

  return (
    <div className="container container--horizontal">
      { memoSidebar }
      { memoRouter }
      { memoGallery }
      { memoDocumentTitle }
    </div>
  );
});
