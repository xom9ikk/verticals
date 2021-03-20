import React, { FC } from 'react';

const getDefault = (module: any) => (module?.default);

type ILazy = (
  importFunc: () => Promise<any>,
  componentResolver: (module: any) => any,
  delay?: number
) => FC;

export const lazy: ILazy = (importFunc, componentResolver = getDefault, delay = 0) => React.lazy(
  () => importFunc()
    .then((module: any) => new Promise((resolve) => setTimeout(() => resolve(module), delay)))
    .then(
      (module:any) => ({
        default: componentResolver(module),
      }),
    ),
);
