/* eslint-disable no-nested-ternary */
import React, {
  FC, useCallback, useEffect, useRef, useState,
} from 'react';
import { Input } from '@comp/Input';
import { useOutsideHandler } from '@/use/outsideHandler';
import { Loader } from '@comp/Loader';
import { useValidator } from '@/use/validator';
import { IValidatorPayload, IValidatorResult } from '@/helpers/validator';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

interface ISyncInput {
  type: string,
  name: string,
  initialValue: IValidatorPayload;
  action: (payload: string) => void;
  validator: (payload: IValidatorPayload) => IValidatorResult;
  width?: string,
  touched?: boolean,
  // error?: string,
  // onChange: (event: React.SyntheticEvent) => void;
  // onBlur?: (event: React.SyntheticEvent) => void;
  // value: string,
  placeholder?: string,
  label?: string,
  style?: Object,
  isMultiline?: boolean,
  isLight?: boolean,
}

export const SyncInput: FC<ISyncInput> = ({
  initialValue,
  action,
  validator,
  ...attrs
}) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validValue, setValidValue] = useState<string>();

  const handlerSubmit = async (valueForUpdate: string) => {
    setIsLoading(true);
    dispatch(action(valueForUpdate));
    setValidValue(valueForUpdate);
  };

  const debounceSubmit = useCallback(
    debounce(handlerSubmit, 500),
    [],
  );

  const {
    handleChange, value, error,
  } = useValidator(initialValue, validator, debounceSubmit);

  useEffect(() => {
    console.log('initialValue', initialValue, 'validValue', validValue);
    if (initialValue === validValue) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [initialValue]);

  const outsideClickHandler = () => {
    setIsLocked(true);
    setIsLoading(false);
  };

  useOutsideHandler(ref, outsideClickHandler);

  const handleClick = () => {
    setIsLocked(false);
    // setTimeout(() => {
    //   // handleChange(e);
    //   // ref.current?.focus();
    //   // ref.current?.blur();
    //   // ref.current?.focus();
    // }, 1000);
  };

  return (
    <div className="sync-input">
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
        touched
      />
    </div>
  );
};
