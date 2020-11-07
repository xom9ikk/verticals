import React, { forwardRef } from 'react';

interface IControlButton {
  imageSrc: string;
  text?: string;
  alt: string;
  tooltip?: string;
  imageSize?: number;
  size?: number;
  isHide?: boolean;
  isHoverBlock?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
  onDoubleClick?: (event: React.SyntheticEvent) => void;
  isMaxWidth?:boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isInvertColor?: boolean;
  isPrimary?: boolean;
  isColored?: boolean;
  isTextable?: boolean;
  style?: React.CSSProperties;
}

export const ControlButtonComponent = ({
  imageSrc,
  text,
  alt,
  tooltip,
  imageSize = 12,
  size,
  isHide = false,
  isHoverBlock = false,
  onClick,
  onDoubleClick,
  isMaxWidth,
  onMouseEnter,
  onMouseLeave,
  isInvertColor,
  isPrimary,
  isColored,
  isTextable,
  style,
}: IControlButton, ref: any) => {
  const classes = ['control-button'];
  if (isHide && !isHoverBlock) {
    classes.push('control-button--invisible');
  }
  if (isHoverBlock) {
    classes.push('control-button--hover-block');
  }
  if (isPrimary) {
    classes.push('control-button--primary');
  }
  if (isMaxWidth) {
    classes.push('control-button--max-width');
  }
  if (isInvertColor) {
    classes.push('control-button--invert');
  }
  if (isColored) {
    classes.push('control-button--colored');
  }
  if (isTextable) {
    classes.push('control-button--textable');
  }

  return (
    <button
      ref={ref}
      className={classes.join(' ')}
      onClick={onClick}
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
};

export const ControlButton = forwardRef(ControlButtonComponent);
