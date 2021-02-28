import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '@store/reducers';

export const useParamSelector = <Args extends any, Value>(
  parametrizedSelectorCreator: (args: Args) => (state: IRootState) => Value,
  param: Args,
) => {
  const memoizedSelector = useMemo(() => parametrizedSelectorCreator(param), [param]);

  return useSelector(memoizedSelector);
};
