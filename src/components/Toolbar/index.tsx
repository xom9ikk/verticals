import React, { FC, useState } from 'react';
import { OpacityButton } from '../OpacityButton';

interface IToolbar {
}

export const Toolbar: FC<IToolbar> = () => {
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <div
      className="toolbar"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="toolbar__inner">
        <OpacityButton
          imageSrc="/svg/add.svg"
          text="New workspace"
          alt="add"
          isHoverBlock={isHover}
        />
        <OpacityButton
          imageSrc="/svg/filter.svg"
          alt="add"
          isHoverBlock={isHover}
          imageSize={24}
        />
      </div>
    </div>
  );
};
