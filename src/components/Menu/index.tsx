import React, {
  FC, SyntheticEvent, useEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Popup } from '@comp/Popup';
import { SystemActions } from '@/store/actions';
import { IRootState } from '@/store/reducers/state';

interface IMenu {
  imageSrc: string;
  text?: string;
  alt: string;
  isHoverBlock?: boolean;
  imageSize?: number;
  size?: number;
  isHide?: boolean;
  isShowPopup?: boolean;
  onClick?: (event: React.SyntheticEvent)=>void;
  isMaxWidth?:boolean;
  onMouseEnter?:()=>void;
  onMouseLeave?:()=>void;
  position?: 'top' | 'left' | 'right' | 'bottom' | 'normal';
  isAbsolute?: boolean;
  isInvertColor?: boolean;
  isPrimary?: boolean;
  style?: any;
}

export const Menu: FC<IMenu> = ({
  imageSrc,
  text,
  alt,
  isHoverBlock = false,
  imageSize = 12,
  size,
  isHide = false,
  isShowPopup = true,
  onClick,
  isMaxWidth,
  onMouseEnter,
  onMouseLeave,
  position,
  isAbsolute = true,
  isInvertColor,
  isPrimary,
  style,
  children,
}) => {
  const dispatch = useDispatch();
  const { isOpenPopup } = useSelector((state:IRootState) => state.system);
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
    isShowPopup && (
    <Popup
      isOpen={isOpen}
      position={position}
      sourceRef={sourceRef}
      isAbsolute={isAbsolute}
    >
      {children}
    </Popup>
    )
  ),
  [isOpen, position, sourceRef]);

  const button = useMemo(() => {
    const classes = ['menu'];
    if (isHide && !isHoverBlock) {
      classes.push('menu--invisible');
    }
    if (isPrimary) {
      classes.push('menu--primary');
    }
    if (isHoverBlock) {
      classes.push('menu--hover-block');
    }
    if (isMaxWidth) {
      classes.push('menu--max-width');
    }
    if (isInvertColor) {
      classes.push('menu--invert');
    }

    const clickHandler = (event: SyntheticEvent) => {
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
      // setIsOpen((prev) => !prev);
    };

    return (
      <button
        ref={sourceRef}
        className={classes.join(' ')}
        onClick={clickHandler}
        onDoubleClick={(e) => e.stopPropagation()}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={size ? { height: size, width: size, ...style } : { ...style }}
      >
        <img
          src={imageSrc}
          alt={alt}
          style={{ width: style?.width || imageSize, height: imageSize }}
        />
        {
          text ? (<span>{text}</span>) : null
        }
      </button>
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
