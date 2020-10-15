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

export const useForm = (
  initialState: any, callback: any,
  validator: any, instantlySubmit?:boolean,
) => {
  console.log('useForm', initialState);
  const [values, setValues] = useState<any>({});
  const [errors, setErrors] = useState(initialState);
  const [touched, setTouched] = useState<any>({});
  const [isValidForm, setIsValidForm] = useState(false);

  useEffect(() => {
    const isSetDefaultValues = Object.keys(initialState)
      .every((key) => {
        const value = initialState[key].defaultValue;
        return value !== null && value !== undefined;
      });
    const isEmptyValues = Object.keys(values).length === 0;
    if (isSetDefaultValues && isEmptyValues) {
      const initialStateForValues = getInitialStateForValues(initialState);
      setValues(initialStateForValues);
      setErrors(validator(initialStateForValues));
      setTouched(getInitialStateForTouched(initialState, false));
    }
  }, [initialState]);

  const updateValue = (key: string, value: any) => {
    const newValues = {
      ...values,
      [key]: value,
    };
    setValues(newValues);
    setErrors(validator(newValues));
  };

  // const resetTouch = (key: string) => {
  //   const newValue = {
  //     ...touched,
  //     [key]: false,
  //   };
  //   setTouched(newValue);
  // };

  const handleSubmit = async (event: React.BaseSyntheticEvent) => {
    if (event) {
      event.preventDefault();
    }
    setTouched(getInitialStateForTouched(initialState, true));
    setErrors(await validator(values));
    console.log('isValidForm', isValidForm);
    if (isValidForm) {
      callback();
    }
  };

  const handleChange = (event: React.BaseSyntheticEvent, selectName?: string) => {
    const { target } = event;
    const name = target ? event.target.name : selectName;
    const value = target ? event.target.value : event;
    updateValue(name, value);
    setTimeout(() => {
      if (instantlySubmit && isValidForm) {
        console.log('instantlySubmit', instantlySubmit, 'isValidForm', isValidForm);
        callback();
      }
    });
  };

  const handleBlur = (event: React.BaseSyntheticEvent, selectName?: string) => {
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
    // resetTouch,
  };
};
