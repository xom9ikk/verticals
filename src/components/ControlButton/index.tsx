import cn from 'classnames';
import React, { forwardRef, SyntheticEvent, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';

interface IControlButton {
  imageSrc?: string;
  className?: string;
  text?: string;
  alt: string;
  tooltip?: string;
  imageSize?: number;
  size?: number;
  isHide?: boolean;
  isInvisible?: boolean;
  isHoverBlock?: boolean;
  isMaxWidth?:boolean;
  isInvertColor?: boolean;
  isPrimary?: boolean;
  isColored?: boolean;
  isTextable?: boolean;
  isStopPropagation?: boolean;
  animationDuration?: number;
  style?: React.CSSProperties;
  onClick?: (event: React.SyntheticEvent) => void;
  onDoubleClick?: (event: React.SyntheticEvent) => void;
}

const ControlButtonComponent = ({
  imageSrc,
  className,
  text,
  alt,
  tooltip,
  imageSize = 12,
  size,
  isHide = false,
  isInvisible = false,
  isHoverBlock = false,
  isMaxWidth,
  isInvertColor,
  isPrimary,
  isColored,
  isTextable,
  isStopPropagation = true,
  animationDuration = 100,
  style,
  onClick,
  onDoubleClick,
}: IControlButton, ref: any) => {
  const defaultTransition = {
    transition: `background ${animationDuration}ms ease-out, 
    opacity ${animationDuration}ms ease-in-out, 
    width ${animationDuration}ms ease-in-out, 
    padding ${animationDuration}ms ease-in-out`,
  };

  const handleClick = (event: SyntheticEvent) => {
    if (isStopPropagation) {
      event.stopPropagation();
    }
    onClick?.(event);
  };

  useEffect(() => {
    if (tooltip) {
      ReactTooltip.rebuild();
    }
  }, [tooltip]);

  return (
    <button
      ref={ref}
      className={cn('control-button', className, {
        'control-button--hidden': isHide,
        'control-button--invisible': isInvisible && !isHoverBlock,
        'control-button--hover-block': isHoverBlock,
        'control-button--primary': isPrimary,
        'control-button--max-width': isMaxWidth,
        'control-button--invert': isInvertColor,
        'control-button--colored': isColored,
        'control-button--textable': isTextable,
      })}
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
      style={size ? {
        height: size, width: size, ...defaultTransition, ...style,
      } : { ...defaultTransition, ...style }}
      data-for="tooltip"
      data-tip={tooltip}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          style={{ width: style?.width || imageSize, height: imageSize }}
        />
      )}
      {
        (text || isTextable) && (
        <span className={cn('control-button__text', {
          'control-button__text--with-image': imageSrc,
        })}
        >
          &nbsp;
          {text}
          &nbsp;
        </span>
        )
      }
    </button>
  );
};

export const ControlButton = forwardRef(ControlButtonComponent);
