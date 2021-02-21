import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface IDatePickerInput {
  onChange: (e: React.BaseSyntheticEvent) => void;
}

export const DatePickerInput: FC<IDatePickerInput> = (
  { onChange }: IDatePickerInput,
) => {
  const { t } = useTranslation();

  return (
    <div className="datepicker-input__wrapper">
      <input
        className="datepicker-input"
        placeholder={t('When')}
        onChange={onChange}
      />
    </div>
  );
};
