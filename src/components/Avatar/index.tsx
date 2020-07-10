import React, { FC } from 'react';

interface IAvatar {
  size?: number;
  imageSrc?: string,
}

export const Avatar: FC<IAvatar> = ({
  size = 44,
  imageSrc = '/avatars/default.jpeg',
}) => (
  <img
    src={imageSrc}
    alt="avatar"
    className="avatar"
    style={{
      height: size,
      width: size,
    }}
  />
);
