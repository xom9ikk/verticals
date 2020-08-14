import React, { FC } from 'react';

const getDefault = (module: any) => (module?.default);

interface ILazy {
  (
    importFunc: () => Promise<any>,
    resolveComponent: (module: any) => any,
    delay?: number
  ): FC
}

export const lazy: ILazy = (importFunc, resolveComponent = getDefault, delay = 0) => React.lazy(
  () => importFunc()
    .then((module: any) => new Promise((resolve) => setTimeout(() => resolve(module), delay)))
    .then(
      (module:any) => ({
        default: resolveComponent(module),
      }),
    ),
);
