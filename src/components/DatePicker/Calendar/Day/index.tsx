import React, { FC, useMemo } from 'react';
import cn from 'classnames';
import isSameDay from 'date-fns/isSameDay';
import isWeekend from 'date-fns/isWeekend';
import isPast from 'date-fns/isPast';
import isToday from 'date-fns/isToday';

interface ICalendarDay {
  date: Date;
  isSelected: boolean;
  highlightDate?: Date;
  onSelectDate: (date: Date) => void;
}

export const CalendarDay: FC<ICalendarDay> = ({
  date,
  isSelected,
  highlightDate,
  onSelectDate,
}) => useMemo(() => (
  <div
    className={cn('calendar-day', {
      'calendar-day--weekend': isWeekend(date),
      'calendar-day--past': isPast(date),
      'calendar-day--today': isToday(date),
      'calendar-day--highlighted': highlightDate && isSameDay(date, highlightDate),
      'calendar-day--selected': isSelected,
    })}
    onClick={() => onSelectDate(date)}
  >
    {date.getDate()}
  </div>
),
[date, isSelected, highlightDate]);
