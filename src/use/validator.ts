import React, { useEffect, useState } from 'react';
import { IValidatorPayload, IValidatorResult } from '@/helpers/validator';

export interface IUseValidatorResult {
  handleChange: (event: React.BaseSyntheticEvent) => void;
  value: IValidatorPayload;
  error?: IValidatorResult;
}

type IUseValidator = (
  initialValue: IValidatorPayload,
  validator: (payload: IValidatorPayload) => IValidatorResult,
  callback?: (value: string) => void,
  validatorCallback?: (value: IValidatorPayload, error: IValidatorResult) => void,
) => IUseValidatorResult;

export const useValidator: IUseValidator = (
  initialValue,
  validator,
  callback,
  validatorCallback,
) => {
  const [value, setValue] = useState<IValidatorPayload>(null);
  const [error, setError] = useState<IValidatorResult>();

  useEffect(() => {
    if (initialValue !== null && value === null) {
      setValue(initialValue);
    }
    const newError = validator(initialValue);
    setError(newError);
    validatorCallback?.(initialValue, newError);
  }, [initialValue]);

  const handleChange = (event: React.BaseSyntheticEvent) => {
    const { value: newValue } = event.target;
    const newError = validator(newValue);
    setValue(newValue);
    setError(newError);
    validatorCallback?.(newValue, newError);
  };

  useEffect(() => {
    const isValid = error?.isValid;
    if (isValid && value !== null && value !== undefined) {
      callback?.(value);
    }
  }, [error]);

  return {
    handleChange,
    value,
    error,
  };
};
