import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { getAvatarUrl, getFullName } from '@store/selectors';

interface IAvatar {
  userAvatarUrl?: string | null
  userFullName?: string;
  size?: number;
  borderSize?: 'small' | 'medium' | 'large';
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Avatar: FC<IAvatar> = ({
  userAvatarUrl,
  userFullName,
  size = 44,
  borderSize = 'large',
  style,
  onClick,
}) => {
  const fullName = userFullName || useSelector(getFullName);
  const url = userAvatarUrl === null ? null : userAvatarUrl || useSelector(getAvatarUrl);
  const firstLetter = fullName[0]?.toUpperCase() ?? ':)';

  return (
    <>
      { url ? (
        <img
          src={url}
          alt="avatar"
          className={`avatar avatar--${borderSize}-border`}
          style={{
            height: size,
            width: size,
            ...style,
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
            ...style,
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
