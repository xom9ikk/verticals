import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import { ControlButton } from '@comp/ControlButton';
import useOutsideClickRef from '@rooks/use-outside-click-ref';
import useKeys from '@rooks/use-keys';
import { Button } from '../Button';

interface IModal {
  isOpen: boolean,
  type?: 'button' | 'submit' | 'reset',
  isSoftExit?: boolean,
  negative?: string,
  positive: string,
  onPositive: () => void,
  onNegative?: () => void,
  renderWrapper?: (children: React.ReactChild) => React.ReactChild,
  onClose: () => void,
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
  const root: HTMLDivElement | null = document.querySelector('#root');

  const handleOutsideClick = () => {
    if (isSoftExit) onClose();
  };

  const setBlur = (value: number) => {
    root!.style.filter = `blur(${value}px)`;
  };

  if (isOpen) {
    setBlur(5);
  } else {
    setBlur(0);
  }

  const handleEscape = () => {
    if (isOpen && isSoftExit) {
      onClose();
    }
  };

  useKeys(['Escape'], handleEscape);

  const [modalRef] = useOutsideClickRef(handleOutsideClick, isOpen);

  const modal = (
    <div className={cn('dialog', {
      'dialog--is-open': isOpen,
    })}
    >
      <div
        ref={modalRef}
        className={`dialog__wrap dialog__wrap--${size}`}
      >
        <ControlButton
          imageSrc="/assets/svg/close.svg"
          alt="close"
          imageSize={16}
          size={32}
          style={{
            position: 'absolute',
            right: 10,
            top: 10,
          }}
          onClick={onClose}
        />
        {
            renderWrapper(
              <>
                {children}
                {!renderWrapper ? children : null}
                <div className="dialog__prompt">
                  {negative && (
                  <Button
                    type="button"
                    modificator="transparent"
                    onClick={onNegative}
                  >
                    {negative}
                  </Button>
                  )}
                  <Button
                    type={type}
                    modificator="primary"
                    onClick={onPositive}
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
