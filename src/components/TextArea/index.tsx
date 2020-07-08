import React, {
  FC, useEffect, useRef,
} from 'react';

interface ITextArea {
  className: string;
  value?: string;
  placeholder: string;
  onChange: (event:any)=>void;
  onKeyUp?: (event:any)=>void;
  min: number,
  max: number;
}

export const TextArea: FC<ITextArea> = ({
  className,
  value,
  placeholder,
  onChange,
  onKeyUp,
  min,
  max,
}) => {
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
    resize();
  }, [value]);

  return (
    <textarea
      style={{
        minHeight: min,
        height: min,
        maxHeight: max,
      }}
      ref={textAreaRef}
      className={className}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyUp={onKeyUp}
    />
  );
};
