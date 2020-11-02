import React, { FC } from 'react';

interface IButton {
  type: 'button' | 'submit' | 'reset',
  modificator?: 'primary' | 'transparent' | 'danger',
  onClick?: (event: React.SyntheticEvent) => void,
  isMaxWidth?: boolean,
  style?: React.CSSProperties,
}

export const Button: FC<IButton> = ({
  type, modificator,
  onClick, isMaxWidth, style, children, ...attrs
}) => {
  const classes = ['button'];

  if (modificator) {
    classes.push(`button--${modificator}`);
  }
  if (isMaxWidth) {
    classes.push('button--max');
  }

  return (
    <button
      {...attrs}
      className={classes.join(' ')}
      type={type}
      onClick={onClick}
      style={style}
    >
      <span
        className="button__content"
      >
        {children}
      </span>
    </button>
  );
};
