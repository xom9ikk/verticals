import { Redirect, Route, RouteProps } from 'react-router-dom';
import React, { FC } from 'react';
import { useAuthenticated } from '@use/authenticated';

interface IRoutePropsWrapper extends RouteProps {
  component?: React.FC;
  layout: React.FC;
  isPrivate?: boolean;
  isRedirectFromPublic?: boolean;
  redirectPath?: string;
}

export const RouteWrapper: FC<IRoutePropsWrapper> = ({
  component: Component = () => <></>,
  layout: Layout,
  isPrivate = false,
  isRedirectFromPublic = true,
  redirectPath = '/auth/login',
  ...rest
}) => {
  const { isAuthenticated } = useAuthenticated();

  const render = (props: any) => {
    const isRedirect = (isPrivate && !isAuthenticated) || (isRedirectFromPublic && !isPrivate && isAuthenticated);

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
