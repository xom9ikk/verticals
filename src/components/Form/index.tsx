import React, { FC } from 'react';

interface IForm {
  title?: string;
  subtitle?: string;
  alignItems?: 'center' | 'right' | 'left';
  isMaxWidth?: boolean;
  handleSubmit: (event: React.BaseSyntheticEvent) => void;
}

export const Form: FC<IForm> = ({
  title,
  subtitle,
  alignItems = 'center',
  isMaxWidth,
  handleSubmit,
  children,
}) => (
  <form
    className={`form form--${alignItems}`}
    onSubmit={handleSubmit}
    noValidate
  >
    <div className={`form__inner ${isMaxWidth ? 'form__inner--max-width' : ''}`}>
      <div className="form__title">{title}</div>
      <div className="form__subtitle">{subtitle}</div>
      {children}
    </div>
  </form>
);
