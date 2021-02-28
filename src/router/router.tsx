import { Redirect, Route, RouteProps } from 'react-router-dom';
import React, { FC } from 'react';
import { storage } from '@plugins/storage';

interface IRoutePropsWrapper extends RouteProps {
  component?: React.FC;
  layout: React.FC;
  isPrivate?: boolean;
  redirectPath?: string;
}

export const RouteWrapper: FC<IRoutePropsWrapper> = ({
  component: Component = () => <></>,
  layout: Layout,
  isPrivate = false,
  redirectPath = '/auth/login',
  ...rest
}) => {
  const render = (props: any) => {
    const isAuthenticated = !!storage.getToken();
    const isRedirect = (isPrivate && !isAuthenticated)
        || (!isPrivate && isAuthenticated);
    return (
      isRedirect
        ? <Redirect to={{ pathname: redirectPath }} />
        : <Layout {...props}><Component {...props} /></Layout>
    );
  };

  return (
    <Route
      {...rest}
      render={render}
    />
  );
};
