/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { IValidatorPayload, IValidatorResult } from '@/helpers/validator';

export const useValidator = (
  initialValue: IValidatorPayload,
  validator: (payload: IValidatorPayload) => IValidatorResult,
  callback: (value: string) => void,
) => {
  const [value, setValue] = useState<IValidatorPayload>(null);
  const [error, setError] = useState<IValidatorResult>();

  useEffect(() => {
    if (initialValue !== null && value === null) {
      setValue(initialValue);
      // setError(validator({ payload: initialValue }));
    }
  }, [initialValue]);

  const updateValue = (value: any) => {
    setValue(value);
    console.log('eeeee', validator(value));
    setError(validator(value));
  };

  const handleChange = (event: React.BaseSyntheticEvent) => {
    if (!event) return;
    // const { target } = event;
    // const value = target ? event.target.value : event;
    updateValue(event.target.value);
  };

  useEffect(() => {
    const isValid = error?.isValid;
    if (isValid && value !== null && value !== undefined) {
      callback(value);
    }
  }, [error]);

  return {
    handleChange,
    updateValue,
    value,
    error,
  };
};
