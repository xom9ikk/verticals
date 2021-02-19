import React, { FC } from 'react';

interface IDatePickerInput {
  onChange: (e: React.BaseSyntheticEvent) => void;
}

export const DatePickerInput: FC<IDatePickerInput> = (
  { onChange }: IDatePickerInput,
) => (
  <div className="datepicker-input__wrapper">
    <input
      className="datepicker-input"
      placeholder="When"
      onChange={onChange}
    />
  </div>
);
