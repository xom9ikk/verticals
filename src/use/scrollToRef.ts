import { MutableRefObject, useRef } from 'react';

export enum EnumScrollPosition {
  Start='start',
  Center='center',
  End='end',
  Nearest='nearest',
}

type IUseScrollToRefReturnType<T> = [
  IUseScrollToRefScroll<T>,
  MutableRefObject<T | null>,
];

type IPositions = {
  block?: EnumScrollPosition,
  inline?: EnumScrollPosition,
};

type IUseScrollToRefScroll<T> = (
  positions: IPositions | EnumScrollPosition,
  customRef?: MutableRefObject<T>,
) => void;

export const useScrollToRef = <T extends HTMLElement | null>(): IUseScrollToRefReturnType<T> => {
  const ref = useRef<T>(null);

  const scroll: IUseScrollToRefScroll<T> = (positions, customRef) => {
    if (ref.current === null && customRef?.current === null) return;
    // @ts-ignore
    let block = positions?.block;
    // @ts-ignore
    let inline = positions?.inline;
    const isPositions = block || inline;
    if (!isPositions) {
      block = positions;
      inline = positions;
    }
    block = block || EnumScrollPosition.Nearest;
    inline = inline || EnumScrollPosition.Nearest;
    requestAnimationFrame(() => {
      customRef?.current?.scrollIntoView({ block, inline, behavior: 'smooth' });
      ref.current?.scrollIntoView({ block, inline, behavior: 'smooth' });
    });
  };

  return [scroll, ref];
};
