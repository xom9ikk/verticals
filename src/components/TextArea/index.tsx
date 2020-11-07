import React, {
  forwardRef, useEffect, useRef, useState,
} from 'react';

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
  const textAreaRef = useRef<any>(null);
  const [height, setHeight] = useState<number>(0);

  const resize = () => {
    textAreaRef.current.style.height = '0px';
    const { scrollHeight } = textAreaRef.current;
    setHeight(scrollHeight);
    textAreaRef.current.style.height = `${scrollHeight}px`;
    if (height !== scrollHeight) {
      onChangeHeight?.(height);
    }
  };

  useEffect(() => {
    // @ts-ignore
    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(textAreaRef.current);
    return () => {
      resizeObserver.unobserve(textAreaRef.current);
    };
  }, []);

  useEffect(() => {
    const {
      fontSize, lineHeight, paddingTop, paddingBottom,
    } = window.getComputedStyle(textAreaRef.current);

    const fz = parseInt(fontSize, 10);
    const pt = parseInt(paddingTop, 10);
    const pb = parseInt(paddingBottom, 10);
    const lh = lineHeight !== 'normal'
      ? parseInt(lineHeight, 10)
      : 1.3;

    const rowHeight = (fz) * lh;
    const min = minRows * rowHeight;
    const max = maxRows * rowHeight + pt + pb;

    textAreaRef.current.style.minHeight = `${min}px`;
    textAreaRef.current.style.height = `${min}px`;
    textAreaRef.current.style.maxHeight = `${max}px`;
  }, [textAreaRef]);

  useEffect(() => {
    resize();
  }, [value]);

  useEffect(() => {
    if (ref) {
      // eslint-disable-next-line no-param-reassign
      ref.current = textAreaRef.current;
    }
  }, [textAreaRef]);

  return (
    <textarea
      {...attrs}
      ref={textAreaRef}
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
