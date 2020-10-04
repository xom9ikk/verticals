/* eslint-disable no-nested-ternary */
import React, {
  FC, useRef, useState,
} from 'react';
import { Input } from '@comp/Input';
import { useOutsideHandler } from '@/use/outsideHandler';
import { Loader } from '@comp/Loader';

interface ILockedInput {
  type: string,
  name: string,
  width?: string,
  touched?: boolean,
  error?: string,
  onChange: (event: React.SyntheticEvent)=>void;
  onBlur?: (event: React.SyntheticEvent)=>void;
  value: string,
  placeholder?: string,
  label?: string,
  style?: Object,
  isMultiline?: boolean,
  isLight?: boolean,
}

export const LockedInput: FC<ILockedInput> = ({
  onChange,
  ...attrs
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const outsideClickHandler = () => {
    setIsLocked(true);
    setIsLoading(false);
  };

  useOutsideHandler(ref, outsideClickHandler);

  const handleClick = (e: React.SyntheticEvent) => {
    setIsLocked(false);
    setTimeout(() => {
      onChange(e);
      ref.current?.focus();
      ref.current?.blur();
      ref.current?.focus();
    });
  };

  const handleChange = (e: React.SyntheticEvent) => {
    console.log('on change', e);
    setIsLoading(true);
    onChange(e);
  };

  return (
    <div className="locked-input">
      <div className="locked-input__overlay">
        {
          isLoading ? (
            <Loader
              isOpen={isLoading}
            />
          )
            : isLocked ? (
              <button
                className="locked-input__button"
                onClick={handleClick}
              >
                Edit
              </button>
            ) : (
              <img
                className="locked-input__indicator"
                src="/assets/svg/menu/tick-active.svg"
                alt="tick"
              />
            )
        }
      </div>
      <Input
        {...attrs}
        ref={ref}
        onChange={handleChange}
        isDisable={isLocked}
      />
    </div>
  );
};
