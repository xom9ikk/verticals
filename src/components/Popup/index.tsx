import React, { FC } from 'react';

interface IPopup {
  isOpen: boolean
  position?: 'top' | 'left' | 'right' | 'bottom' | 'normal';
  // isMaxWidth?: boolean;
  style?: any;
}

export const Popup: FC<IPopup> = ({
  isOpen,
  position,
  // isMaxWidth,
  style,
  children,
}) => {
  // console.log('popup rerender');
  const classes = ['popup'];
  if (!isOpen) {
    classes.push('popup--invisible');
  }
  classes.push(`popup--${position || 'top'}`);
  // if (!isMaxWidth) {
  //   classes.push(`popup--${position || 'top'}`);
  // } else {
  //   classes.push('popup--top-max-width');
  // }
  return (
    <>
      <div
        className={classes.join(' ')}
        style={style}
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
      >
        <div className="popup__inner">
          {children}
        </div>
      </div>
    </>
  );
};
