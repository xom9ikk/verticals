import React, { FC, Suspense } from 'react';
import {
  Router, Switch,
} from 'react-router-dom';

import { AuthLayout } from '@layouts/auth';
import { NotFound } from '@pages/404';
import { history } from '@router/history';
import { lazy } from '@router/lazy';
import { RouteWrapper } from '@router/router';
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
      <Suspense fallback={<></>}>
        <Switch>
          <RouteWrapper
            path="/auth/register"
            layout={AuthLayout}
            component={Register}
            redirectPath="/"
            exact
          />
          <RouteWrapper
            path="/auth/login"
            layout={AuthLayout}
            component={Login}
            redirectPath="/"
            exact
          />
          <RouteWrapper
            path="/auth/reset"
            layout={AuthLayout}
            component={Reset}
            redirectPath="/"
            exact
          />
          {isAuthenticated
            ? (
              <RouteWrapper
                path="/about"
                layout={About}
                isPrivate
                exact
              />
            )
            : (
              <RouteWrapper
                path="/"
                layout={About}
                isRedirectFromPublic={false}
                exact
              />
            )}
          <RouteWrapper
            path="/:userId?/:boardId?/(card|subcard)?/:cardId?"
            layout={MainLayout}
            isPrivate
            redirectPath="/"
          />
          <RouteWrapper
            layout={AuthLayout}
            component={NotFound}
          />
        </Switch>
      </Suspense>
    </Router>
  );
};
