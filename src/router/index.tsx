import React, { FC } from 'react';
import {
  Router, Switch,
} from 'react-router-dom';
import { lazy } from '@/router/lazy';
import { history } from '@/router/history';
import { RouteWrapper } from '@/router/router';
import { NotFound } from '@/pages/404';
import { AuthLayout } from '@/layouts/auth';
import { SuspenseWrapper } from '@comp/SuspenseWrapper';

export const MainLayout = lazy(() => import('@/layouts/main'), (module) => module.MainLayout);
export const Register = lazy(() => import('@/pages/auth/register'), (module) => module.Register);
export const Login = lazy(() => import('@/pages/auth/login'), (module) => module.Login);
export const Reset = lazy(() => import('@/pages/auth/reset'), (module) => module.Reset);

export const MainRouter: FC = () => (
  <Router history={history}>
    <Switch>
      <RouteWrapper
        path="/auth/register"
        layout={AuthLayout}
        component={() => <SuspenseWrapper component={Register} />}
        redirectPath="/"
        exact
      />
      <RouteWrapper
        path="/auth/login"
        layout={AuthLayout}
        component={() => <SuspenseWrapper component={Login} />}
        redirectPath="/"
        exact
      />
      <RouteWrapper
        path="/auth/reset"
        layout={AuthLayout}
        component={() => <SuspenseWrapper component={Reset} />}
        redirectPath="/"
        exact
      />
      <RouteWrapper
        path="/"
        layout={() => <SuspenseWrapper component={MainLayout} />}
        isPrivate
        redirectPath="/auth/login"
        exact
      />
      <RouteWrapper
        layout={AuthLayout}
        component={NotFound}
      />
    </Switch>
  </Router>
);
