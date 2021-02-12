import React, { FC, useRef } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import { useOutsideHandler } from '@use/outsideHandler';
import { ControlButton } from '@comp/ControlButton';
import { Button } from '../Button';

interface IModal {
  isOpen: boolean,
  type?: 'button' | 'submit' | 'reset',
  isSoftExit?: boolean,
  negative?: string,
  positive: string,
  onPositive: Function,
  onNegative?: Function,
  renderWrapper?: (children: React.ReactChild) => React.ReactChild,
  onClose: Function,
  size?: string,
}

export const Modal: FC<IModal> = ({
  isOpen,
  type = 'button',
  isSoftExit = true,
  negative,
  positive,
  onPositive,
  onNegative,
  renderWrapper = (c: React.ReactChild) => c,
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
    console.log('handleClose');
    onClose();
  };

  const handleOutsideClick = () => {
    if (isSoftExit) handleClose();
  };

  useOutsideHandler(ref, handleOutsideClick);

  const setBlur = (value: number) => {
    root!.style.filter = `blur(${value}px)`;
  };

  if (isOpen) {
    setBlur(5);
    if (isSoftExit) {
      document.body.onkeydown = (e) => {
        if (e.code === 'Escape') {
          handleClose();
        }
      };
    }
  } else {
    setBlur(0);
    document.body.onkeydown = null;
  }

  const modal = (
    <div className={cn('dialog', {
      'dialog--is-open': isOpen,
    })}
    >
      <div
        ref={ref}
        className={`dialog__wrap dialog__wrap--${size}`}
      >
        <ControlButton
          imageSrc="/assets/svg/close.svg"
          alt="close"
          imageSize={24}
          size={30}
          style={{
            position: 'absolute',
            right: 10,
            top: 10,
          }}
          onClick={handleClose}
        />
        {
            renderWrapper(
              <>
                {children}
                {
                !renderWrapper ? children : null
              }
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
                    type={type}
                    modificator="primary"
                    onClick={handlePositive}
                  >
                    {positive}
                  </Button>
                </div>
              </>,
            )
          }
      </div>
    </div>
  );

  return createPortal(modal, document.querySelector('#modal-root')!);
};
