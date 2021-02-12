import React, { forwardRef } from 'react';
import cn from 'classnames';

interface IControlButton {
  imageSrc: string;
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
  style?: React.CSSProperties;
  onClick?: (event: React.SyntheticEvent) => void;
  onDoubleClick?: (event: React.SyntheticEvent) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const ControlButtonComponent = ({
  imageSrc,
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
  style,
  onClick,
  onDoubleClick,
  onMouseEnter,
  onMouseLeave,
}: IControlButton, ref: any) => (
  <button
    ref={ref}
    className={cn('control-button', {
      'control-button--hidden': isHide,
      'control-button--invisible': isInvisible && !isHoverBlock,
      'control-button--hover-block': isHoverBlock,
      'control-button--primary': isPrimary,
      'control-button--max-width': isMaxWidth,
      'control-button--invert': isInvertColor,
      'control-button--colored': isColored,
      'control-button--textable': isTextable,
    })}
    onClick={(e) => {
      if (isStopPropagation) {
        e.stopPropagation();
      }
      onClick?.(e);
    }}
    onDoubleClick={onDoubleClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    style={size ? { height: size, width: size, ...style } : { ...style }}
    data-for="tooltip"
    data-tip={tooltip}
  >
    <img
      src={imageSrc}
      alt={alt}
      style={{ width: style?.width || imageSize, height: imageSize }}
    />
    {
      (text || isTextable) && (
        <span className="control-button__text">
          &nbsp;
          {text}
          &nbsp;
        </span>
      )
     }
  </button>
);

export const ControlButton = forwardRef(ControlButtonComponent);
