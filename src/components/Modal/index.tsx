/* eslint-disable no-undef */
import React, { FC, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Menu } from '@comp/Menu';
import { useOutsideHandler } from '@/use/outsideHandler';
import { Button } from '../Button';

interface IModal {
  isOpen: boolean,
  isSoftExit?: boolean,
  negative?: string,
  positive: string,
  onPositive: Function,
  onNegative?: Function,
  onClose: Function,
  size?: string,
}

export const Modal: FC<IModal> = ({
  isOpen,
  isSoftExit = true,
  negative,
  positive,
  onPositive,
  onNegative,
  onClose,
  size = 'small',
  children,
}) => {
  const ref = useRef<any>();
  const root: HTMLDivElement | null = document.querySelector('#root');

  const handlePositive = () => {
    onPositive();
  };

  const handleNegative = () => {
    if (onNegative) {
      onNegative();
    }
  };

  const handleClose = () => {
    onClose();
  };

  const outsideClickHandler = () => {
    if (isSoftExit) handleClose();
  };

  useOutsideHandler(ref, outsideClickHandler);

  const setBlur = (value: number) => {
    root!.style.filter = `blur(${value}px)`;
  };

  const classes = ['dialog'];
  if (isOpen) {
    setBlur(5);
    classes.push('dialog--is-open');
    if (isSoftExit) {
      document.body.onkeydown = (e) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
    }
  } else {
    setBlur(0);
    document.body.onkeydown = null;
  }

  const modal = (
    <>
      <div className={classes.join(' ')}>
        {/* <span */}
        {/*  role="button" */}
        {/*  tabIndex={0} */}
        {/*  className="dialog__back" */}
        {/*  onClick={isSoftExit ? handleClose : () => {}} */}
        {/* /> */}
        <div
          ref={ref}
          className={`dialog__wrap dialog__wrap--${size}`}
        >
          <Menu
            imageSrc="/assets/svg/close.svg"
            alt="close"
            imageSize={24}
            size={30}
            isShowPopup={false}
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
            }}
            onClick={handleClose}
          />
          {children}
          <div
            className="dialog__prompt"
          >
            {
                negative && (
                <Button
                  type="button"
                  modificator="transparent"
                  onClick={handleNegative}
                >
                  {negative}
                </Button>
                )
              }
            <Button
              type="button"
              modificator="primary"
              onClick={handlePositive}
            >
              {positive}
            </Button>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modal, document.querySelector('#modal-root')!);
};
