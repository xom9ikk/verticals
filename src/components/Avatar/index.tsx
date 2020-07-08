import React, { FC } from 'react';

interface IAvatar {
  imageSrc?: string,
}

export const Avatar: FC<IAvatar> = ({
  imageSrc = '/avatars/default.jpeg',
}) => (
  <img
    src={imageSrc}
    alt="avatar"
    className="avatar"
  />
);
