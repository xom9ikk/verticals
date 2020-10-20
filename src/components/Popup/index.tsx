import React, {
  FC, MutableRefObject, useMemo, useState,
} from 'react';
import { createPortal } from 'react-dom';

interface IPopup {
  isOpen: boolean
  isSubMenu?: boolean
  isAbsolute: boolean
  sourceRef: MutableRefObject<any>
  position?: 'top' | 'left' | 'right' | 'bottom' | 'normal';
  style?: any;
}

interface ICoordinates {
  top?: number | undefined,
  right?: number | undefined,
  bottom?: number | undefined,
  left?: number | undefined,
}

export const Popup: FC<IPopup> = ({
  isOpen,
  sourceRef,
  isSubMenu,
  isAbsolute,
  position,
  style,
  children,
}) => {
  const [observed, setObserved] = useState<any>({
    clientWidth: 0,
    clientHeight: 0,
  });

  const popup = () => {
    const classes = ['popup'];
    if (isSubMenu) {
      classes.push(`popup--${position || 'top'}`);
    }
    return (
      <div
        role="button"
        tabIndex={0}
        className={classes.join(' ')}
        style={style}
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
      >
        <div className={`popup__inner ${isSubMenu ? 'popup__inner--submenu' : ''}`}>
          {children}
        </div>
      </div>
    );
  };

  const memoPopup = useMemo(() => {
    if (!isOpen) {
      return null;
    }
    if (isOpen && isSubMenu) {
      return popup();
    }

    const coordinates: ICoordinates = {};
    const margin = 6;

    if (observed) {
      const {
        top, bottom, left, right, width, height,
      } = sourceRef.current.getBoundingClientRect();
      const {
        clientWidth, clientHeight,
      } = observed;
      let { scrollX, scrollY } = window;
      const { innerHeight } = window;
      if (!isAbsolute) {
        scrollY = 0;
        scrollX = 0;
      }
      switch (position) {
        case 'top': {
          coordinates.bottom = innerHeight - top + margin - scrollY;
          coordinates.left = left + width / 2 - clientWidth / 2 + scrollX;
          break;
        }
        case 'right': {
          coordinates.bottom = innerHeight - bottom + width - clientHeight - scrollY;
          coordinates.left = left + width + margin * 2 + scrollX;
          break;
        }
        case 'bottom': {
          coordinates.bottom = innerHeight - bottom - clientHeight - margin - scrollY;
          coordinates.left = left + width / 2 - clientWidth / 2 + scrollX;
          break;
        }
        case 'left': {
          coordinates.bottom = innerHeight - bottom + width - clientHeight - scrollY;
          coordinates.left = right - width - margin - clientWidth + scrollX;
          break;
        }
        default: break;
      }
      if (top - clientHeight < 0 && position !== 'left' && position !== 'right') {
        coordinates.bottom = innerHeight - bottom - clientHeight - margin - scrollY;
      }
      if (bottom + clientHeight > innerHeight && position !== 'top') {
        coordinates.bottom = innerHeight - top - height - scrollY;
      }
    }

    const wrapperStyle = {
      position: `${isAbsolute ? 'absolute' : 'fixed'}`,
      zIndex: `${isAbsolute ? 1 : 2}`,
      ...coordinates,
    } as React.CSSProperties;
    const content = (
      <div
        ref={((el) => setObserved(el))}
        style={wrapperStyle}
      >
        {popup()}
      </div>
    );
    return createPortal(content, document.querySelector('#menu-root')!);
  }, [isOpen, observed, children]);

  return isOpen ? (
    <>{memoPopup}</>
  ) : null;
};
