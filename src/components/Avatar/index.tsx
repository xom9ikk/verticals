import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { getAvatarUrl, getFullName } from '@/store/selectors';

interface IAvatar {
  size?: number;
  onClick?: () => void;
}

export const Avatar: FC<IAvatar> = ({
  size = 44,
  onClick,
}) => {
  const fullName = useSelector(getFullName);
  const url = useSelector(getAvatarUrl);
  const firstLetter = fullName[0]?.toUpperCase() ?? ':)';

  return (
    <>
      { url ? (
        <img
          src={url}
          alt="avatar"
          className="avatar"
          style={{
            height: size,
            width: size,
          }}
          onClick={onClick}
          data-for="tooltip"
          data-tip={fullName}
        />
      ) : (
        <span
          className="avatar avatar--letter"
          style={{
            height: size,
            width: size,
            fontSize: size / 2,
          }}
          onClick={onClick}
          data-for="tooltip"
          data-tip={fullName}
        >
          {firstLetter}
        </span>
      )}
    </>
  );
};
