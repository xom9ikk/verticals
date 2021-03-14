import React, { forwardRef, useEffect } from 'react';
import cn from 'classnames';
import ReactTooltip from 'react-tooltip';

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
  animationDuration?: number;
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
  animationDuration = 100,
  style,
  onClick,
  onDoubleClick,
  onMouseEnter,
  onMouseLeave,
}: IControlButton, ref: any) => {
  const defaultTransition = {
    transition: `background ${animationDuration}ms ease-out, 
    opacity ${animationDuration}ms ease-in-out, 
    width ${animationDuration}ms ease-in-out, 
    padding ${animationDuration}ms ease-in-out`,
  };

  useEffect(() => {
    if (tooltip) {
      ReactTooltip.rebuild();
    }
  }, [tooltip]);

  return (
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
      style={size ? {
        height: size, width: size, ...defaultTransition, ...style,
      } : { ...defaultTransition, ...style }}
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
};

export const ControlButton = forwardRef(ControlButtonComponent);
