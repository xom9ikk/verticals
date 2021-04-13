import React, { FC, useMemo } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAuthenticated } from '@use/authenticated';

interface IRoutePropsWrapper extends RouteProps {
  component?: React.FC;
  layout: React.FC;
  isPrivate?: boolean;
  isRedirectFromPublic?: boolean;
  redirectPath?: string;
}

const RedirectRoute: FC<IRoutePropsWrapper> = ({
  component: Component = () => <></>,
  layout: Layout,
  isPrivate = false,
  isRedirectFromPublic = true,
  redirectPath = '/auth/login',
  ...rest
}) => {
  const { isAuthenticated } = useAuthenticated();

  const isRedirect = (isPrivate && !isAuthenticated) || (isRedirectFromPublic && !isPrivate && isAuthenticated);

  return useMemo(() => (isRedirect
    ? <Redirect to={{ pathname: redirectPath }} />
    : <Layout {...rest}><Component {...rest} /></Layout>),
  [isRedirect]);
};

export const RouteWrapper: FC<IRoutePropsWrapper> = ({
  component,
  layout,
  isPrivate,
  isRedirectFromPublic,
  redirectPath,
  ...rest
}) => (
  <Route {...rest}>
    <RedirectRoute
      component={component}
      layout={layout}
      isPrivate={isPrivate}
      isRedirectFromPublic={isRedirectFromPublic}
      redirectPath={redirectPath}
      {...rest}
    />
  </Route>
);
