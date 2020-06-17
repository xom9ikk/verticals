import React, { FC, useState } from 'react';

interface ICheckbox {
  isActiveDefault: boolean;
}

export const Checkbox: FC<ICheckbox> = ({ isActiveDefault }) => {
  const [isActive, setIsActive] = useState<boolean>(isActiveDefault);
  return (
    <button
      className={`checkbox ${isActive ? 'checkbox--active' : ''}`}
      onClick={() => setIsActive((prev) => !prev)}
    >
      <img src="/svg/tick.svg" alt="tick" />
    </button>
  );
};
