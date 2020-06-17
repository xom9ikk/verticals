import React, { FC } from 'react';

interface IPopup {
  isOpen: boolean
  position?: 'top' | 'left' | 'right' | 'bottom';
}

export const Popup: FC<IPopup> = ({
  isOpen,
  position,
  children,
}) => {
  const classes = ['popup'];
  if (!isOpen) {
    classes.push('popup--invisible');
  }
  classes.push(`popup--${position || 'top'}`);
  return (
    <>
      <div className={classes.join(' ')}>
        {children}
      </div>
    </>
  );
};
