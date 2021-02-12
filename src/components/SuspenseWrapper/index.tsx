import React, { FC, Suspense } from 'react';

interface ISuspenseWrapper {
  component: FC
  fallback?: FC
}

export const SuspenseWrapper: FC<ISuspenseWrapper> = ({
  component: Component,
  fallback: Fallback = () => <></>,
  ...rest
}) => (
  <Suspense fallback={<Fallback />}>
    <Component {...rest} />
  </Suspense>
);

export const suspense = (Component: FC) => (props: any) => (
  <SuspenseWrapper
    {...props}
    component={Component}
  />
);
