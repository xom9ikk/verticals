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
  value: string,
  placeholder?: string,
  label?: string,
  style?: Object,
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

  const inputClasses = [
    'input__field',
  ];
  if (isError) {
    inputClasses.push('input__field--invalid');
  }
  if (isSuccess) {
    inputClasses.push('input__field--valid');
  }
  if (isDisable) {
    inputClasses.push('input__field--disabled');
  }
  if (children || isLight) {
    inputClasses.push('input__field--light-border');
  }

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
                  className={inputClasses.join(' ')}
                  name={name}
                  value={value}
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
                  className={inputClasses.join(' ')}
                  type={type}
                  name={name}
                  value={value}
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
              className={`input__error ${isError ? 'input__error--open' : ''}`}
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
