import React, { FC } from 'react';
import {
  Router, Switch,
} from 'react-router-dom';
import { history } from '@/router/history';
import { RouteWrapper } from '@/router/router';
import { NotFound } from '@/pages/404';
import { AuthLayout } from '@/layouts/auth';
import { SuspenseWrapper } from '@comp/SuspenseWrapper';

const getDefault = (module: any) => (module?.default);

interface ILazy {
  (
    importFunc: () => Promise<any>,
    resolveComponent: (module: any) => any,
    delay?: number
  ): FC
}

const lazy: ILazy = (importFunc, resolveComponent = getDefault, delay = 0) => React.lazy(
  () => importFunc()
    .then((module: any) => new Promise((resolve) => setTimeout(() => resolve(module), delay)))
    .then(
      (module:any) => ({
        default: resolveComponent(module),
      }),
    ),
);

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
        exact
      />
      <RouteWrapper
        path="/auth/login"
        layout={AuthLayout}
        component={() => <SuspenseWrapper component={Login} />}
        exact
      />
      <RouteWrapper
        path="/auth/reset"
        layout={AuthLayout}
        component={() => <SuspenseWrapper component={Reset} />}
        exact
      />
      <RouteWrapper
        path="/"
        layout={() => <SuspenseWrapper component={MainLayout} fallback={() => <></>} />}
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
