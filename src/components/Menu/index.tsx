import React, {
  FC, SyntheticEvent, useEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Popup } from '@comp/Popup';
import { SystemActions } from '@store/actions';
import { getIsOpenPopup } from '@store/selectors';
import { ControlButton } from '@comp/ControlButton';

interface IMenu {
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
  imageSrc,
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
  const isOpenPopup = useSelector(getIsOpenPopup);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const sourceRef = useRef<any>(null);

  useEffect(() => {
    if (isClicked) {
      setIsClicked(false);
      dispatch(SystemActions.setIsOpenPopup(true));
      if (!isOpenPopup && isClicked) {
        setIsOpen(true);
      }
    }
  }, [isClicked]);

  useEffect(() => {
    if (!isClicked && !isOpenPopup) {
      setIsOpen(false);
    }
  }, [isOpenPopup]);

  const popup = useMemo(() => (
    <Popup
      isOpen={isOpen}
      position={position}
      sourceRef={sourceRef}
      isAbsolute={isAbsolute}
      style={{ zIndex: 2 }}
    >
      {children}
    </Popup>
  ),
  [isOpen, position, sourceRef, isAbsolute, children]);

  const button = useMemo(() => {
    const handleClick = (event: SyntheticEvent) => {
      event.stopPropagation();
      onClick?.(event);
      if (isOpenPopup) {
        dispatch(SystemActions.setIsOpenPopup(false));
        if (isOpen) {
          setIsOpen(false);
        }
      }
      if (!isOpen) {
        setIsClicked(true);
        setIsOpen(true);
      }
    };

    return (
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
        onClick={handleClick}
        onDoubleClick={(e) => e.stopPropagation()}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );
  }, [
    isHide, isHoverBlock, isMaxWidth,
    isInvertColor, size, imageSrc,
    alt, text, isOpen,
    isOpenPopup, style,
  ]);

  return (
    <>
      {button}
      {popup}
    </>
  );
};
