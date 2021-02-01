/* eslint-disable no-param-reassign */
import React, {
  forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState,
} from 'react';
import ResizeObserver from 'resize-observer-polyfill';

interface ITextArea {
  className: string;
  name?: string,
  value?: string;
  placeholder?: string;
  onChange: (event:any) => void;
  onBlur?: (event:any) => void;
  onKeyUp?: (event:any) => void;
  onKeyDown?: (event:any) => void;
  onKeyDownCapture?: (event:any) => void;
  minRows: number,
  maxRows: number;
  onChangeHeight?: (height: number) => void;
  style?: React.CSSProperties;
}

const TextAreaComponent = ({
  className,
  name,
  value = '',
  placeholder,
  onChange,
  onBlur,
  onKeyUp,
  onKeyDown,
  onKeyDownCapture,
  minRows,
  maxRows,
  onChangeHeight,
  style,
  ...attrs
}: ITextArea, ref: any) => {
  const internalRef = useRef<HTMLTextAreaElement | null>(null);

  useImperativeHandle(ref, () => internalRef.current);

  const [height, setHeight] = useState<number>(0);

  const resize = (el: HTMLTextAreaElement) => {
    el.style.height = '0px';
    const { scrollHeight } = el;
    setHeight(scrollHeight);
    el.style.height = `${scrollHeight}px`;
    if (height !== scrollHeight) {
      onChangeHeight?.(height);
    }
  };

  const setDefaultHeight = (el: HTMLTextAreaElement, min: number, max: number) => {
    el.style.minHeight = `${min}px`;
    el.style.height = `${min}px`;
    el.style.maxHeight = `${max}px`;
  };

  useLayoutEffect(() => {
    console.log('internalRef', internalRef);
    if (!internalRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      console.log('call 2 resize HTMLTextAreaElement', internalRef.current);
      if (internalRef.current) {
        resize(internalRef.current!);
      }
    });
    resizeObserver.observe(internalRef.current!);
    return () => {
      console.log('unmount', internalRef.current);
      resizeObserver.unobserve(internalRef.current!);
    };
  }, []);

  useEffect(() => {
    if (internalRef.current) {
      const {
        fontSize, lineHeight, paddingTop, paddingBottom,
      } = window.getComputedStyle(internalRef.current!);

      const fz = parseInt(fontSize, 10);
      const pt = parseInt(paddingTop, 10);
      const pb = parseInt(paddingBottom, 10);
      const lh = lineHeight !== 'normal'
        ? parseInt(lineHeight, 10)
        : 1.3;

      const rowHeight = fz * lh;
      const min = minRows * rowHeight;
      const max = maxRows * rowHeight + pt + pb;
      setDefaultHeight(internalRef.current!, min, max);
    }
  }, [ref]);

  useEffect(() => {
    if (internalRef.current) {
      console.log('call 1 resize HTMLTextAreaElement', internalRef.current);
      resize(internalRef.current!);
    }
  }, [value]);

  // useEffect(() => {
  //   if (ref) {
  //     console.log('textAreaRef', textAreaRef.current);
  //     // eslint-disable-next-line no-param-reassign
  //     ref.current = ref.current;
  //   }
  // }, [textAreaRef]);

  return (
    <textarea
      {...attrs}
      ref={internalRef}
      name={name}
      className={className}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      onKeyDownCapture={onKeyDownCapture}
      style={style}
    />
  );
};

export const TextArea = forwardRef(TextAreaComponent);
