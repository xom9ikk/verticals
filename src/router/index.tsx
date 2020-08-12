import React, { FC, Suspense } from 'react';
import {
  Router, Switch,
} from 'react-router-dom';
import { history } from '@/router/history';
import { RouteWrapper } from '@/router/router';
import { NotFound } from '@/pages/404';
import { AuthLayout } from '@/layouts/auth';
import { FallbackLoader } from '@comp/FallbackLoader';

const MainLayout = React.lazy(() => import(/* webpackChunkName: "main" */'@/layouts/main').then(
  (module) => ({
    default: module.MainLayout,
  }),
));

const Register = React.lazy(() => import(/* webpackChunkName: "auth.register" */'@/pages/auth/register').then(
  (module) => ({
    default: module.Register,
  }),
));

const Login = React.lazy(() => import(/* webpackChunkName: "auth.login" */'@/pages/auth/login').then(
  (module) => ({
    default: module.Login,
  }),
));

const Reset = React.lazy(() => import(/* webpackChunkName: "auth.reset" */'@/pages/auth/reset').then(
  (module) => ({
    default: module.Reset,
  }),
));

export const MainRouter: FC = () => (
  <Router history={history}>
    <Switch>
      <RouteWrapper
        path="/auth/register"
        layout={AuthLayout}
        component={() => (
          <Suspense fallback={<FallbackLoader />}>
            <Register />
          </Suspense>
        )}
        exact
      />
      <RouteWrapper
        path="/auth/login"
        layout={AuthLayout}
        component={() => (
          <Suspense fallback={<FallbackLoader />}>
            <Login />
          </Suspense>
        )}
        exact
      />
      <RouteWrapper
        path="/auth/reset"
        layout={AuthLayout}
        component={() => (
          <Suspense fallback={<FallbackLoader />}>
            <Reset />
          </Suspense>
        )}
        exact
      />
      <RouteWrapper
        path="/"
        layout={() => (
          <Suspense fallback={<FallbackLoader />}>
            <MainLayout />
          </Suspense>
        )}
        exact
        isPrivate
      />
      <RouteWrapper
        layout={AuthLayout}
        component={NotFound}
      />
    </Switch>
  </Router>
);
