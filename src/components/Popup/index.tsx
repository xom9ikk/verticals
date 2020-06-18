import React, { FC } from 'react';

interface IPopup {
  isOpen: boolean
  position?: 'top' | 'left' | 'right' | 'bottom';
  style?: any;
}

export const Popup: FC<IPopup> = ({
  isOpen,
  position,
  style,
  children,
}) => {
  // console.log('popup rerender');
  const classes = ['popup'];
  if (!isOpen) {
    classes.push('popup--invisible');
  }
  classes.push(`popup--${position || 'top'}`);
  return (
    <>
      <div className={classes.join(' ')} style={style}>
        <div className="popup__inner">
          {children}
        </div>
      </div>
    </>
  );
};
