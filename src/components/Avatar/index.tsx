import React, { FC } from 'react';

interface IAvatar {
  size?: number;
  imageSrc?: string;
  onClick?: () => void;
}

export const Avatar: FC<IAvatar> = ({
  size = 44,
  imageSrc = '/assets/images/avatars/default.jpeg',
  onClick,
}) => (
  <img
    src={imageSrc}
    alt="avatar"
    className="avatar"
    style={{
      height: size,
      width: size,
    }}
    onClick={onClick}
    data-for="tooltip"
    data-tip="Max Romanyuta"
  />
);
