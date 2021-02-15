/* eslint-disable no-nested-ternary */
import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import useOutsideClickRef from '@rooks/use-outside-click-ref';
import { Input } from '@comp/Input';
import { Loader } from '@comp/Loader';
import { useValidator } from '@use/validator';
import { IValidatorPayload, IValidatorResult } from '@helpers/validator';

interface ISyncInput {
  type: string,
  name: string,
  initialValue: IValidatorPayload;
  action: (payload: string) => void;
  validator: (payload: IValidatorPayload) => IValidatorResult;
  width?: string,
  touched?: boolean,
  placeholder?: string,
  label?: string,
  style?: React.CSSProperties,
  isMultiline?: boolean,
  isLight?: boolean,
}

export const SyncInput: FC<ISyncInput> = ({
  initialValue,
  action,
  validator,
  style,
  ...attrs
}) => {
  const dispatch = useDispatch();
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validValue, setValidValue] = useState<string>();

  const handleSubmit = async (valueForUpdate: string) => {
    setIsLoading(true);
    dispatch(action(valueForUpdate));
    setValidValue(valueForUpdate);
  };

  const debounceSubmit = useCallback(
    debounce(handleSubmit, 500),
    [],
  );

  const {
    handleChange, value, error,
  } = useValidator(initialValue, validator, debounceSubmit);

  useEffect(() => {
    if (initialValue === validValue) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [initialValue]);

  const handleOutsideClick = () => {
    setIsLocked(true);
    setIsLoading(false);
  };

  const [ref] = useOutsideClickRef(handleOutsideClick, !isLocked);

  const handleClick = () => {
    setIsLocked(false);
  };

  return (
    <div className="sync-input" style={style}>
      <div className="sync-input__overlay">
        {
          isLoading ? (
            <Loader
              isOpen={isLoading}
            />
          )
            : isLocked ? (
              <button
                className="sync-input__button"
                onClick={handleClick}
              >
                Edit
              </button>
            ) : (
              <img
                className="sync-input__indicator"
                src="/assets/svg/menu/tick.svg"
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
        value={value || ''}
        error={error?.message}
        touched={!isLocked}
      />
    </div>
  );
};
