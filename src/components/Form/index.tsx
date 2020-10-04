import React, { FC } from 'react';

interface IForm {
  title?: string;
  subtitle?: string;
  alignItems?: 'center' | 'right' | 'left';
  isMaxWidth?: boolean;
  handleSubmit: (event: React.BaseSyntheticEvent) => void;
}

export const Form: FC<IForm> = ({
  title = '',
  subtitle = '',
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
      {title?.length > 0 && <div className="form__title">{title}</div>}
      {subtitle?.length > 0 && <div className="form__subtitle">{subtitle}</div>}
      {children}
    </div>
  </form>
);
