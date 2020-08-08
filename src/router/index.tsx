import React, { FC } from 'react';
import {
  BrowserRouter, Redirect, Route, RouteProps, Switch,
} from 'react-router-dom';
import { AuthLayout } from '../layouts/auth';
import { Register } from '../pages/auth/register';
import { Login } from '../pages/auth/login';
import { Reset } from '../pages/auth/reset';
import { MainLayout } from '../layouts/main';

interface IRoutePropsWrapper extends RouteProps {
  layout: React.FC;
  isPrivate?: boolean;
}

const RouteWrapper = ({
  component: Component,
  layout: Layout,
  isPrivate = false,
  ...rest
}: IRoutePropsWrapper) => (
  <Route
    {...rest}
    render={(props) => {
      const isAuthenticated = false; // TODO
      return (
        isPrivate === false || isAuthenticated
        // @ts-ignore
          ? <Layout {...props}><Component {...props} /></Layout>
          : <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />);
    }}
  />
);

export const MainRouter: FC = () => (
  <BrowserRouter>
    <Switch>
      <RouteWrapper path="/auth/register" layout={AuthLayout} component={Register} exact />
      <RouteWrapper path="/auth/login" layout={AuthLayout} component={Login} exact />
      <RouteWrapper path="/auth/reset" layout={AuthLayout} component={Reset} exact />
      <RouteWrapper path="/" layout={MainLayout} exact isPrivate />
    </Switch>
  </BrowserRouter>
);
