import React, { FC } from 'react';

interface IForm {
  title: string,
  subtitle: string,
  handleSubmit: (event: React.BaseSyntheticEvent) => void,
}

export const Form: FC<IForm> = ({
  title, subtitle, handleSubmit, children,
}) => (
  <form
    className="form"
    onSubmit={handleSubmit}
    noValidate
  >
    <div className="form__inner">
      <div className="form__title">{title}</div>
      <div className="form__subtitle">{subtitle}</div>
      {children}
    </div>
  </form>
);
