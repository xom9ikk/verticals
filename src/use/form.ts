import React, { useState } from 'react';
import { IUseValidatorResult, useValidator } from '@use/validator';
import { IValidatorPayload, IValidatorResult } from '@helpers/validator';

export interface IFormValues {
  [key: string]: IValidatorPayload;
}

interface IFormErrors {
  [key: string]: string;
}

interface IFormTouched {
  [key: string]: boolean;
}

interface IFormValidator {
  [key: string]: (payload: IValidatorPayload) => IValidatorResult;
}

interface IValidators {
  [key: string]: IUseValidatorResult;
}

type IUseForm = <T>(
  initialValues: IFormValues,
  callback:(data: T) => void,
  formValidator: IFormValidator,
) => {
  handleChange: (event: React.BaseSyntheticEvent) => void;
  handleBlur: (event: React.BaseSyntheticEvent) => void;
  handleSubmit: (event: React.BaseSyntheticEvent) => void;
  values: IFormValues;
  errors: IFormErrors;
  touches: IFormTouched;
};

const validators: IValidators = {};

export const useForm: IUseForm = (
  initialValues, callback, formValidator,
) => {
  const [values, setValues] = useState<IFormValues>({});
  const [errors, setErrors] = useState<IFormErrors>({});
  const [touches, setTouches] = useState<IFormTouched>({});

  const handleValidatorResult = (
    key: string, value: IValidatorPayload, error: IValidatorResult,
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: error?.message! }));
  };

  const initialValuesKeys = Object.keys(initialValues);
  initialValuesKeys.forEach((key) => {
    validators[key] = useValidator(
      initialValues[key],
      formValidator[key],
      undefined,
      (...rest) => handleValidatorResult(key, ...rest),
    );
  });

  const handleChange = (event: React.BaseSyntheticEvent) => {
    const { name } = event.target;
    validators[name].handleChange(event);
  };

  const handleSubmit = (event: React.BaseSyntheticEvent) => {
    if (event) {
      event.preventDefault();
    }

    const validatorsKeys = Object.keys(validators);
    const allTouched: IFormTouched = validatorsKeys
      .reduce((acc, value) => ({
        ...acc,
        [value]: true,
      }), {});
    setTouches(allTouched);

    const errorsKeys = Object.keys(errors);
    const isValidForm = errorsKeys.every((key) => !errors[key]);

    if (isValidForm) {
      callback(values as any);
    }
  };

  const handleBlur = (event: React.BaseSyntheticEvent, selectName?: string) => {
    const { target } = event;
    const name = target?.name ?? selectName;
    setTouches(() => ({
      ...touches,
      [name]: true,
    }));
  };

  return {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touches,
  };
};
