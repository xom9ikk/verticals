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
import { useAuthenticated } from '@use/authenticated';

const MainLayout = lazy(() => import('@layouts/main'), (module) => module.MainLayout);
const Register = lazy(() => import('@pages/auth/Register'), (module) => module.Register);
const Login = lazy(() => import('@pages/auth/Login'), (module) => module.Login);
const Reset = lazy(() => import('@pages/auth/Reset'), (module) => module.Reset);
const About = lazy(() => import('@pages/About'), (module) => module.About);

export const MainRouter: FC = () => {
  const { isAuthenticated } = useAuthenticated();

  return (
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
        {isAuthenticated
          ? (
            <RouteWrapper
              path="/about"
              layout={suspense(About)}
              isPrivate
              // redirectPath="/"
              // isRedirectFromPublic={false}
              exact
            />
          )
          : (
            <RouteWrapper
              path="/"
              layout={suspense(About)}
              isRedirectFromPublic={false}
              exact
            />
          )}
        <RouteWrapper
          path="/:userId?/:boardId?/(card|subcard)?/:cardId?"
          layout={suspense(MainLayout)}
          isPrivate
          redirectPath="/"
        />
        <RouteWrapper
          layout={AuthLayout}
          component={NotFound}
        />
      </Switch>
    </Router>
  );
};
