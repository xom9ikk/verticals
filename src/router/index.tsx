import React, { FC } from 'react';
import {
  Router, Switch,
} from 'react-router-dom';
import { lazy } from '@router/lazy';
import { history } from '@router/history';
import { RouteWrapper } from '@router/router';
import { suspense } from '@comp/SuspenseWrapper';
import { NotFound } from '@pages/404';
import { AuthLayout } from '@layouts/auth';

const MainLayout = lazy(() => import('@layouts/main'), (module) => module.MainLayout);
const Register = lazy(() => import('@pages/auth/Register'), (module) => module.Register);
const Login = lazy(() => import('@pages/auth/Login'), (module) => module.Login);
const Reset = lazy(() => import('@pages/auth/Reset'), (module) => module.Reset);

export const MainRouter: FC = () => (
  <Router history={history}>
    <Switch>
      <RouteWrapper
        path="/auth/register"
        layout={AuthLayout}
        component={suspense(Register)}
        redirectPath="/"
        exact
      />
      <RouteWrapper
        path="/auth/login"
        layout={AuthLayout}
        component={suspense(Login)}
        redirectPath="/"
        exact
      />
      <RouteWrapper
        path="/auth/reset"
        layout={AuthLayout}
        component={suspense(Reset)}
        redirectPath="/"
        exact
      />
      <RouteWrapper
        path="/:userId?/:boardId?/(card|subcard)?/:cardId?"
        layout={suspense(MainLayout)}
        isPrivate
        redirectPath="/auth/login"
      />
      <RouteWrapper
        layout={AuthLayout}
        component={NotFound}
      />
    </Switch>
  </Router>
);
