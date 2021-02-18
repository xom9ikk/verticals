import React, {
  FC, ReactComponentElement, ReactElement, SyntheticEvent, useMemo, useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Popup } from '@comp/Popup';
import { SystemActions } from '@store/actions';
import { getActivePopupId } from '@store/selectors';
import { ControlButton } from '@comp/ControlButton';
import useOutsideClickRef from '@rooks/use-outside-click-ref';
import useKeys from '@rooks/use-keys';
import { MenuItem } from '@comp/MenuItem';
import { Submenu } from '@comp/Submenu';

interface IMenu {
  id: string;
  onSelect: (action: any, payload: any) => void;
  imageSrc: string;
  text?: string;
  alt: string;
  tooltip?: string;
  isHoverBlock?: boolean;
  imageSize?: number;
  size?: number;
  isHide?: boolean;
  isInvisible?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
  isMaxWidth?:boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  position?: 'top' | 'left' | 'right' | 'bottom' | 'normal';
  isAbsolute?: boolean;
  isInvertColor?: boolean;
  isPrimary?: boolean;
  isColored?: boolean;
  style?: React.CSSProperties;
}

export const Menu: FC<IMenu> = ({
  id,
  imageSrc,
  onSelect,
  text,
  alt,
  tooltip,
  isHoverBlock = false,
  imageSize = 12,
  size,
  isHide = false,
  isInvisible = false,
  onClick,
  isMaxWidth,
  onMouseEnter,
  onMouseLeave,
  position,
  isAbsolute = true,
  isInvertColor,
  isPrimary,
  isColored,
  style,
  children,
}) => {
  const dispatch = useDispatch();
  const activePopupId = useSelector(getActivePopupId);
  const sourceRef = useRef<any>(null);

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

  const popup = useMemo(() => (
    <Popup
      isOpen={isActive}
      position={position}
      sourceRef={sourceRef}
      isAbsolute={isAbsolute}
      style={{ zIndex: 2 }}
    >
      {React.Children.map(children, (child: ReactComponentElement<typeof MenuItem | typeof Submenu>) => {
        if (child.type.name === 'MenuItem') {
          return wrapping(child);
        }
        if (child.type.name === 'Submenu') {
          return React.cloneElement(
            child, {
              ...child.props,
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
  ),
  [isActive, position, sourceRef, isAbsolute, children]);

  const button = useMemo(() => (
    <ControlButton
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
      isHoverBlock={isHoverBlock}
      isMaxWidth={isMaxWidth}
      isInvertColor={isInvertColor}
      isPrimary={isPrimary}
      isColored={isColored}
      isStopPropagation={false}
      onClick={handleClick}
      onDoubleClick={(e) => e.stopPropagation()}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  ), [
    isHide, isHoverBlock, isMaxWidth,
    isInvertColor, size, imageSrc,
    alt, text,
    activePopupId, style,
  ]);

  const handleOutsideClick = () => {
    dispatch(SystemActions.setActivePopupId(null));
  };

  const [ref] = useOutsideClickRef(handleOutsideClick, !!activePopupId);

  return (
    <div ref={ref}>
      {button}
      {popup}
    </div>
  );
};
