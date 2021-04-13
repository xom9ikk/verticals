import cn from 'classnames';
import React, {
  FC, MutableRefObject, SyntheticEvent, useMemo, useState,
} from 'react';
import { createPortal } from 'react-dom';

interface IPopup {
  isOpen: boolean;
  isSubMenu?: boolean;
  isAbsolute: boolean;
  sourceRef: MutableRefObject<any>;
  position?: 'top' | 'left' | 'right' | 'bottom' | 'normal';
  width?: number;
  maxHeight?: number;
  isHideVerticalScroll?: boolean;
  isHideHorizontalScroll?: boolean;
  style?: React.CSSProperties;
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
  position = 'top',
  width: defaultWidth = 240,
  maxHeight,
  isHideVerticalScroll = true,
  isHideHorizontalScroll = true,
  style,
  children,
}) => {
  const [observed, setObserved] = useState<any>({
    clientWidth: 0,
    clientHeight: 0,
  });

  const handleClick = (event: SyntheticEvent) => event.stopPropagation();

  const popup = () => (
    <div
      className={cn('popup', {
        [`popup--${position}`]: isSubMenu,
        'popup--submenu': isSubMenu,
      })}
      style={style}
      onClick={handleClick}
      onDoubleClick={handleClick}
    >
      <div
        className={cn('popup__inner', {
          'popup__inner--hide-vertical-scroll': isHideVerticalScroll,
          'popup__inner--hide-horizontal-scroll': isHideHorizontalScroll,
        })}
        style={{
          minWidth: defaultWidth,
          overflow: isSubMenu ? 'scroll' : 'hidden',
          maxHeight,
        }}
      >
        {children}
      </div>
    </div>
  );

  const memoPopup = useMemo(() => {
    if (!isOpen) {
      return null;
    }
    if (isOpen && isSubMenu) {
      return popup();
    }

    const coordinates: ICoordinates = {};
    const margin = 6;

    if (observed && sourceRef.current) {
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
      zIndex: `${isAbsolute ? 2 : 3}`,
      ...coordinates,
    } as React.CSSProperties;

    const content = (
      <div
        ref={setObserved}
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
