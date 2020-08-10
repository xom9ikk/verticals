import React, { FC } from 'react';
import defaultAvatar from '@/assets/avatars/default.jpeg';

interface IAvatar {
  size?: number;
  imageSrc?: string,
}

export const Avatar: FC<IAvatar> = ({
  size = 44,
  imageSrc = defaultAvatar,
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
