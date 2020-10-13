import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { getFullName } from '@/store/selectors';

interface IAvatar {
  size?: number;
  imageSrc?: string;
  onClick?: () => void;
}

export const Avatar: FC<IAvatar> = ({
  size = 44,
  imageSrc,
  onClick,
}) => {
  const fullName = useSelector(getFullName);
  const firstLetter = fullName[0]?.toUpperCase() ?? ':)';

  return (
    <>
      { imageSrc ? (
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
