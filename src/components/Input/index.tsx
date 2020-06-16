import React, { FC } from 'react';

interface IInput {
  type: string,
  name: string,
  width?: string,
  touched?: boolean,
  error?: string,
  onChange: any,
  onBlur?: any,
  value: string,
  placeholder?: string,
}

export const Input: FC<IInput> = ({
  type, name, width, touched, error,
  onChange, onBlur, value, placeholder, children, ...attrs
}) => {
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
  if (children) {
    inputClasses.push('input__field--light-border');
  }

  return (
    <div className="input" style={{ width: `${width}px` }}>
      <div className="input__inner">
        <div className="input__holder">
          {children}
          <input
            {...attrs}
            className={inputClasses.join(' ')}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            style={{ height: children ? 33 : 44, paddingLeft: children ? 33 : 44 }}
          />
        </div>
      </div>
      <div className={`input__error ${isError ? 'input__error--open' : ''}`}>
        { isError ? error : ''}
      </div>
    </div>
  );
};
