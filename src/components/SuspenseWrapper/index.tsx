import React, { FC, Suspense } from 'react';
import { FallbackLoader } from '@comp/FallbackLoader';

interface ISuspenseWrapper {
  component: FC
  fallback?: FC
}

export const SuspenseWrapper: FC<ISuspenseWrapper> = ({
  component: Component,
  fallback: Fallback = FallbackLoader,
}) => (
  <Suspense fallback={<Fallback />}>
    <Component />
  </Suspense>
);
