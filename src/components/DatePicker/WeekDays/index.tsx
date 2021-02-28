import React, { FC, useMemo } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

const weekend = [0, 6];

export const DatePickerWeekDays: FC = () => {
  const { t } = useTranslation();

  const days = useMemo(() => [
    t('Sun'),
    t('Mon'),
    t('Tue'),
    t('Wed'),
    t('Thu'),
    t('Fri'),
    t('Sat'),
  ], [t]);

  return (
    <div className="datepicker-weekdays">
      {
        days.map((day, index) => (
          <div
            key={day}
            className={cn('datepicker-weekdays__day', {
              'datepicker-weekdays__day--weekend': weekend.includes(index),
            })}
          >
            {day}
          </div>
        ))
      }
    </div>
  );
};
