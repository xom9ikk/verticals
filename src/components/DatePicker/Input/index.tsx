import React, { forwardRef } from 'react';

interface IDatePickerInput {
  onChange: (e: React.BaseSyntheticEvent) => void;
}

const DatePickerInputComponent = (
  { onChange }: IDatePickerInput,
  ref: any,
) => (
  <div className="datepicker-input__wrapper">
    <input
      ref={ref}
      className="datepicker-input"
      placeholder="When"
      onChange={onChange}
    />
  </div>
);
export const DatePickerInput = forwardRef(DatePickerInputComponent);
