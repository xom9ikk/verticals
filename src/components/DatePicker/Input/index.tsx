import React, { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useFocus } from '@use/focus';

interface IDatePickerInput {
  isOpen: boolean;
  onChange: (e: React.BaseSyntheticEvent) => void;
}

export const DatePickerInput: FC<IDatePickerInput> = ({
  isOpen,
  onChange,
}) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLInputElement>(null);

  useFocus(ref, [isOpen]);

  return (
    <div className="datepicker-input__wrapper">
      <input
        ref={ref}
        className="datepicker-input"
        placeholder={t('When')}
        onChange={onChange}
      />
    </div>
  );
};
