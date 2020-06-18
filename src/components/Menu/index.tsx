import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Popup } from '../Popup';
import { IRootState } from '../../store/reducers/state';
import { SystemActions } from '../../store/actions';

interface IMenu {
  imageSrc: string;
  text?: string;
  alt: string;
  isHoverBlock?: boolean;
  imageSize?: number;
  size?: number;
  isHide?: boolean;
  onClick?: ()=>void;
  isMaxWidth?:boolean;
  onMouseEnter?:()=>void;
  onMouseLeave?:()=>void;
  position?: 'top' | 'left' | 'right' | 'bottom';
  isInvertColor?: boolean;
}

export const Menu: FC<IMenu> = ({
  imageSrc,
  text,
  alt,
  isHoverBlock = false,
  imageSize = 12,
  size,
  isHide = false,
  onClick,
  isMaxWidth,
  onMouseEnter,
  onMouseLeave,
  position,
  isInvertColor,
  children,
}) => {
  const dispatch = useDispatch();
  const { isOpenPopup } = useSelector((state:IRootState) => state.system);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

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

  // TODO: rerender
  // console.log('menu rerender');

  const popup = useMemo(() => (
    <Popup
      isOpen={isOpen}
      position={position}
    >
      {children}
    </Popup>
  ), [isOpen, position]);

  const button = useMemo(() => {
    const classes = ['menu'];
    if (isHide && !isHoverBlock) {
      classes.push('menu--invisible');
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
    return (
      <button
        className={classes.join(' ')}
        style={size ? { height: size, width: size } : {}}
        onClick={() => {
          onClick?.();
          if (isOpenPopup) {
            dispatch(SystemActions.setIsOpenPopup(false));
            if (isOpen) {
              setIsOpen(false);
            }
          }
          if (!isOpen) {
            setIsClicked(true);
          }
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <img
          src={imageSrc}
          alt={alt}
          style={{ width: imageSize, height: imageSize }}
        />
        {
            text ? (<span>{text}</span>) : null
          }
      </button>
    );
  }, [
    isHide, isHoverBlock, isMaxWidth,
    isInvertColor, size, imageSrc,
    alt, text, isOpen, isOpenPopup,
  ]);

  return (
    <>
      {popup}
      {button}
    </>
  );
};
