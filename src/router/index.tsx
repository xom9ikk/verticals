import React, { FC } from 'react';
import {
  Router, Switch,
} from 'react-router-dom';
import { AuthLayout } from '@/layouts/auth';
import { Register } from '@/pages/auth/register';
import { Login } from '@/pages/auth/login';
import { Reset } from '@/pages/auth/reset';
import { MainLayout } from '@/layouts/main';
import { history } from '@/router/history';
import { RouteWrapper } from '@/router/router';
import { NotFound } from '@/pages/404';

export const MainRouter: FC = () => (
  <Router history={history}>
    <Switch>
      <RouteWrapper path="/auth/register" layout={AuthLayout} component={Register} exact />
      <RouteWrapper path="/auth/login" layout={AuthLayout} component={Login} exact />
      <RouteWrapper path="/auth/reset" layout={AuthLayout} component={Reset} exact />
      <RouteWrapper path="/" layout={MainLayout} exact isPrivate />
      <RouteWrapper layout={AuthLayout} component={NotFound} />
    </Switch>
  </Router>
);
