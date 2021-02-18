import React, { FC } from 'react';
import cn from 'classnames';

const days = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
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
