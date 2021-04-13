import cn from 'classnames';
import isPast from 'date-fns/isPast';
import isSameDay from 'date-fns/isSameDay';
import isToday from 'date-fns/isToday';
import isWeekend from 'date-fns/isWeekend';
import React, { FC } from 'react';

interface ICalendarDay {
  date: Date;
  isSelected: boolean;
  highlightDate?: Date | null;
  onSelectDate: (date: Date) => void;
}

export const CalendarDay: FC<ICalendarDay> = React.memo(({
  date,
  isSelected,
  highlightDate = null,
  onSelectDate,
}) => {
  const handleClick = () => onSelectDate(date);

  return (
    <div
      className={cn('calendar-day', {
        'calendar-day--weekend': isWeekend(date),
        'calendar-day--past': isPast(date),
        'calendar-day--today': isToday(date),
        'calendar-day--highlighted': highlightDate && isSameDay(date, highlightDate),
        'calendar-day--selected': isSelected,
      })}
      onClick={handleClick}
    >
      {date.getDate()}
    </div>
  );
});
