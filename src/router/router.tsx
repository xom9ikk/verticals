import { Redirect, Route, RouteProps } from 'react-router-dom';
import React, { FC } from 'react';
import { storage } from '../plugins/storage';

interface IRoutePropsWrapper extends RouteProps {
  layout: React.FC;
  isPrivate?: boolean;
}

const DefaultRedirect: FC = () => (<Redirect to={{ pathname: '/auth/login' }} />);

export const RouteWrapper: FC<IRoutePropsWrapper> = ({
  component: Component,
  layout: Layout,
  isPrivate = false,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      // const isAuthenticated = false; // TODO
      const isAuthenticated = !!storage.getToken();
      return (
        isPrivate === false || isAuthenticated
        // @ts-ignore
          ? <Layout {...props}><Component {...props} /></Layout>
          : <DefaultRedirect />);
    }}
  />
);
