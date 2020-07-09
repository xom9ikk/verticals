import React, {
  forwardRef, useEffect, useRef,
} from 'react';

interface ITextArea {
  className: string;
  value?: string;
  placeholder: string;
  onChange: (event:any)=>void;
  onKeyUp?: (event:any)=>void;
  onKeyDownCapture?: (event:any)=>void;
  minRows: number,
  maxRows: number;
}

const TA = ({
  className,
  value,
  placeholder,
  onChange,
  onKeyUp,
  onKeyDownCapture,
  minRows,
  maxRows,
}: ITextArea, ref: any) => {
  const textAreaRef = useRef<any>(null);

  const resize = () => {
    textAreaRef.current.style.height = '0px';
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
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
      ref={textAreaRef}
      className={className}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyUp={onKeyUp}
      onKeyDownCapture={onKeyDownCapture}
    />
  );
};

export const TextArea = forwardRef(TA);
