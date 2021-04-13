import cn from 'classnames';
import React, { forwardRef } from 'react';

import { TextArea } from '@comp/TextArea';

interface IInput {
  type: string,
  name: string,
  width?: string,
  touched?: boolean,
  error?: string,
  onChange: (event:any) => void;
  onBlur?: (event:any) => void;
  onKeyDown?: (event:any) => void;
  value: string | null,
  placeholder?: string,
  label?: string,
  style?: React.CSSProperties,
  isMultiline?: boolean,
  isLight?: boolean,
  isDisable?: boolean,
  children?: any,
}

export const InputComponent = ({
  type,
  name,
  width,
  touched,
  error,
  onChange,
  onBlur,
  onKeyDown,
  value,
  placeholder,
  label,
  style,
  isMultiline,
  isLight,
  isDisable,
  children,
  ...attrs
}: IInput, ref: any) => {
  const isError = (touched && !!error);
  const isSuccess = !error;

  const className = cn('input__field', {
    'input__field--invalid': isError,
    'input__field--valid': isSuccess,
    'input__field--disabled': isDisable,
    'input__field--light-border': children || isLight,
  });

  return (
    <div className="input" style={{ width: `${width}px` }}>
      <div className="input__wrapper">
        <div className="input__inner">
          {
            label && <span className="input__label">{label}</span>
          }
          <div className="input__holder">
            {children}
            {
              isMultiline ? (
                <TextArea
                  {...attrs}
                  ref={ref}
                  className={className}
                  name={name}
                  value={value || ''}
                  placeholder={placeholder}
                  onChange={onChange}
                  onBlur={onBlur}
                  onKeyDown={onKeyDown}
                  style={style}
                  minRows={4}
                  maxRows={9}
                />
              ) : (
                <input
                  {...attrs}
                  ref={ref}
                  className={className}
                  type={type}
                  name={name}
                  value={value || ''}
                  placeholder={placeholder}
                  onChange={onChange}
                  onBlur={onBlur}
                  onKeyDown={onKeyDown}
                  style={style}
                  disabled={isDisable}
                />
              )
            }
            <div
              className={cn('input__error', {
                'input__error--open': isError,
              })}
            >
              { isError ? error : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Input = forwardRef(InputComponent);
