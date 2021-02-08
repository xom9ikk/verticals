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
// import { Main } from '@pages/DELETED_main';
// import { MainLayout } from '@layouts/main';
// import { SettingsLayout } from '@layouts/Settings';

export const MainLayout = lazy(() => import('@layouts/main'), (module) => module.MainLayout);
// export const Main = lazy(() => import('@pages/main'), (module) => module.Main);
export const Register = lazy(() => import('@pages/auth/Register'), (module) => module.Register);
export const Login = lazy(() => import('@pages/auth/Login'), (module) => module.Login);
export const Reset = lazy(() => import('@pages/auth/Reset'), (module) => module.Reset);
export const Account = lazy(() => import('@pages/settings/Account'), (module) => module.Account);
export const Profile = lazy(() => import('@pages/settings/Profile'), (module) => module.Profile);

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
        path="/:userId?/:boardId?/(card)?/:todoId?"
        layout={suspense(MainLayout)}
          // component={() => <SuspenseWrapper component={Main} />}
        isPrivate
        redirectPath="/auth/login"
          // exact
      />
      {/* <RouteWrapper */}
      {/*  path="/" */}
      {/*  layout={suspense(MainLayout)} */}
      {/*    // component={() => <SuspenseWrapper component={Main} />} */}
      {/*  isPrivate */}
      {/*  redirectPath="/auth/login" */}
      {/*    // exact */}
      {/* /> */}
      <RouteWrapper
        layout={AuthLayout}
        component={NotFound}
      />
    </Switch>
  </Router>
);
