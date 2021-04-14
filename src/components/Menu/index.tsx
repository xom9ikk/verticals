import useKeys from '@rooks/use-keys';
import useOutsideClickRef from '@rooks/use-outside-click-ref';
import React, {
  ReactComponentElement, ReactElement, SyntheticEvent, forwardRef, useMemo, useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ControlButton } from '@comp/ControlButton';
import { MenuItem } from '@comp/Menu/Item';
import { SubMenu } from '@comp/Menu/Sub';
import { Popup } from '@comp/Popup';
import { SystemActions } from '@store/actions';
import { getActivePopupId } from '@store/selectors';

interface IMenu {
  id: string;
  onSelect: (action: any, payload: any) => void;
  imageSrc: string;
  buttonClassName?: string;
  text?: string;
  alt: string;
  tooltip?: string;
  imageSize?: number;
  size?: number;
  isHide?: boolean;
  isInvisible?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
  isMaxWidth?:boolean;
  position?: 'top' | 'left' | 'right' | 'bottom' | 'normal';
  isAbsolute?: boolean;
  isInvertColor?: boolean;
  isPrimary?: boolean;
  isColored?: boolean;
  style?: React.CSSProperties;
  width?: number;
  children?: any;
}

const MenuComponent = ({
  id,
  imageSrc,
  buttonClassName,
  onSelect,
  text,
  alt,
  tooltip,
  imageSize = 12,
  size,
  isHide = false,
  isInvisible = false,
  onClick,
  isMaxWidth,
  position,
  isAbsolute = true,
  isInvertColor,
  isPrimary,
  isColored,
  style,
  width = 240,
  children,
}: IMenu, ref: any) => {
  const dispatch = useDispatch();
  const activePopupId = useSelector(getActivePopupId);
  const sourceRef = ref || useRef<any>(null);

  const isActive = activePopupId === id;

  const switchPopup = () => {
    if (isActive) {
      dispatch(SystemActions.setActivePopupId(null));
    } else {
      dispatch(SystemActions.setActivePopupId(id));
    }
  };

  const handleClick = (event: SyntheticEvent) => {
    event.stopPropagation();
    onClick?.(event);
    switchPopup();
  };

  useKeys(['Escape'], switchPopup, {
    when: isActive,
  });

  const wrapping = (child: ReactElement) => (
    React.cloneElement(
      child, {
        ...child.props,
        onClick: () => {
          onSelect(child.props.action, child.props.payload);
        },
      },
    )
  );

  const memoPopup = useMemo(() => (isActive ? (
    <Popup
      isOpen={isActive}
      position={position}
      sourceRef={sourceRef}
      isAbsolute={isAbsolute}
      style={{ zIndex: 2 }}
      width={width}
    >
      {React.Children.map(children, (child: ReactComponentElement<typeof MenuItem | typeof SubMenu>) => {
        if (child.type.displayName === 'MenuItem') {
          return wrapping(child);
        }
        if (child.type.displayName === 'SubMenu') {
          return React.cloneElement(
            child, {
              ...child.props,
              // @ts-ignore
              children: React.Children.map(child.props.children, wrapping),
            },
          );
        }
        return (
          React.cloneElement(
            child, {
              ...child.props,
            },
          )
        );
      })}
    </Popup>
  ) : null),
  [isActive, position, sourceRef, isAbsolute, children]);

  const handleDoubleClick = (event: SyntheticEvent) => event.stopPropagation();

  const memoButton = useMemo(() => (
    <ControlButton
      className={buttonClassName}
      ref={sourceRef}
      imageSrc={imageSrc}
      alt={alt}
      imageSize={imageSize}
      tooltip={tooltip}
      size={size}
      style={style}
      text={text}
      animationDuration={0}
      isHide={isHide}
      isInvisible={isInvisible}
      isMaxWidth={isMaxWidth}
      isInvertColor={isInvertColor}
      isPrimary={isPrimary}
      isColored={isColored}
      isStopPropagation={false}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    />
  ), [
    buttonClassName, isHide, isMaxWidth,
    isInvertColor, size, imageSrc, alt, text,
    activePopupId, style,
  ]);

  const handleOutsideClick = () => {
    dispatch(SystemActions.setActivePopupId(null));
  };

  const [wrapperRef] = useOutsideClickRef(handleOutsideClick, !!activePopupId);

  return (
    <div ref={wrapperRef}>
      {memoButton}
      {memoPopup}
    </div>
  );
};

export const Menu = forwardRef(MenuComponent);
