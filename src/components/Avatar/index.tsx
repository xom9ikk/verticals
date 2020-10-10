import React, { FC } from 'react';

interface IAvatar {
  fullName: string;
  size?: number;
  imageSrc?: string;
  onClick?: () => void;
}

export const Avatar: FC<IAvatar> = ({
  fullName,
  size = 44,
  imageSrc,
  onClick,
}) => {
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
