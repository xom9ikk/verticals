import React, { FC, Suspense } from 'react';

interface ISuspenseWrapper {
  component: FC
  fallback?: FC
}

export const SuspenseWrapper: FC<ISuspenseWrapper> = ({
  component: Component,
  fallback: Fallback = () => <></>,
}) => (
  <Suspense fallback={<Fallback />}>
    <Component />
  </Suspense>
);
