import React, {
  useEffect, useCallback, useRef, useReducer, Reducer,
} from 'react';
import { actions, resizableReducer } from '@use/resizable/reducer';
import { getPositionFromMouseOrTouch } from '@use/resizable/utils';
import {
  directionMap, windowEvents, IResizableOption, IResizableState,
} from '@use/resizable/types';

export const useResizable = (option: IResizableOption) => {
  const ref = useRef<HTMLDivElement>(null);

  const [state, dispatch] = useReducer<Reducer<IResizableState, any>>(resizableReducer, option);
  const group = directionMap[state.direction];

  const handleStartMove = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    dispatch(actions.start({
      position: getPositionFromMouseOrTouch(group, event.nativeEvent),
    }));
  }, [group]);

  useEffect(() => {
    if (!option.size && ref.current) {
      dispatch(actions.init({
        size: group === 'vertical'
          ? ref.current.offsetHeight
          : ref.current.offsetWidth,
      }));
    }
  }, [option.size, group]);

  useEffect(() => {
    if (state.isMove && state.size !== undefined) {
      option.onResize?.(state.size);
    }
  }, [state.size, state.isMove]);

  useEffect(() => {
    const handleEvent = (event: MouseEvent | TouchEvent) => {
      if (event.type.includes('move')) {
        dispatch(actions.move({
          position: getPositionFromMouseOrTouch(group, event),
        }));
      } else {
        dispatch(actions.end());
      }
    };
    if (state.isMove) {
      // @ts-ignore
      windowEvents.forEach((type) => window.addEventListener(type, handleEvent));
      document.body.style.cursor = group === 'vertical' ? 'row-resize !important' : 'ew-resize !important';
      document.body.style.userSelect = 'none';
    }
    return () => {
      // @ts-ignore
      windowEvents.forEach((type) => window.removeEventListener(type, handleEvent));
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [state.isMove, group]);

  return {
    ref,
    size: state.size,
    handler: handleStartMove,
  };
};