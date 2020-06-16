import React, { useEffect, useState } from 'react';

const getInitialStateForTouched = (initialState: any, value: any) => {
  const arr: any = { };
  Object.keys(initialState).forEach((key) => {
    arr[key] = value;
  });
  return arr;
};

const getInitialStateForValues = (initialState: any) => {
  const arr: any = { };
  Object.keys(initialState).forEach((key) => {
    arr[key] = initialState[key].defaultValue;
  });
  return arr;
};

export const useForm = (initialState: any, callback: any, validator: any) => {
  const [
    values,
    setValues,
  ] = useState<any>({});
  const [
    errors,
    setErrors,
  ] = useState(initialState);
  const [
    touched,
    setTouched,
  ] = useState<any>({});
  const [
    isValidForm,
    setIsValidForm,
  ] = useState(false);

  useEffect(() => {
    setValues(getInitialStateForValues(initialState));
    setTouched(getInitialStateForTouched(initialState, false));
  }, []);

  const updateValue = (key: string, value: any) => {
    const newValues = {
      ...values,
      [key]: value,
    };
    setValues(newValues);
    setErrors(validator(newValues));
  };

  const resetTouch = (key: string) => {
    const newValue = {
      ...touched,
      [key]: false,
    };
    setTouched(newValue);
  };

  const handleChange = (event: React.BaseSyntheticEvent, selectName: string) => {
    const { target } = event;
    const name = target ? event.target.name : selectName;
    const value = target ? event.target.value : event;
    updateValue(name, value);
  };

  const handleSubmit = async (event: React.BaseSyntheticEvent) => {
    if (event) {
      event.preventDefault();
    }
    setTouched(getInitialStateForTouched(initialState, true));
    setErrors(await validator(values));
    if (isValidForm) {
      callback();
    }
  };

  const handleBlur = (event: React.BaseSyntheticEvent, selectName: string) => {
    const { target } = event;
    const name = target && target.name ? target.name : selectName;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  useEffect(() => {
    setIsValidForm(Object.keys(errors).every((key) => errors[key].isValid));
  }, [errors]);

  return {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    updateValue,
    resetTouch,
  };
};
