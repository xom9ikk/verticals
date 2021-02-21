import React, { FC } from 'react';
import cn from 'classnames';
import i18n from '@/i18n';

const days = [
  i18n.t('Sun'),
  i18n.t('Mon'),
  i18n.t('Tue'),
  i18n.t('Wed'),
  i18n.t('Thu'),
  i18n.t('Fri'),
  i18n.t('Sat'),
];

const weekend = [0, 6];

export const DatePickerWeekDays: FC = () => (
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
