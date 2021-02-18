import React, { FC, useMemo } from 'react';
import cn from 'classnames';
import endOfWeek from 'date-fns/endOfWeek';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import isSameMonth from 'date-fns/isSameMonth';
import isSameDay from 'date-fns/isSameDay';
import isThisYear from 'date-fns/isThisYear';
import lastDayOfMonth from 'date-fns/lastDayOfMonth';
import addMonths from 'date-fns/addMonths';
import { CalendarDay } from '@comp/DatePicker/Calendar/Day';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface ICalendarWeek {
  startDate: Date;
  selectedDates?: Array<Date>;
  highlightDate?: Date;
  onSelectDate: (date: Date) => void;
}

export const CalendarWeek: FC<ICalendarWeek> = ({
  startDate,
  selectedDates,
  highlightDate,
  onSelectDate,
}) => {
  const year = startDate.getFullYear();
  const nextMonth = useMemo(() => addMonths(startDate, 1), [startDate]);
  const month = months[nextMonth.getMonth()];
  const endDate = useMemo(() => endOfWeek(startDate), [startDate]);

  const days = useMemo(() => eachDayOfInterval({
    start: startDate,
    end: endDate,
  }), [startDate, endDate]);

  const lastDay = useMemo(() => lastDayOfMonth(startDate), [startDate]);
  const isShowYear = useMemo(() => !isThisYear(startDate), [startDate]);

  const isNewMonthInWeek = useMemo(() => days.some((day) => !isSameMonth(day, lastDay)), [days, lastDay]);
  const isLastDayInMonth = useMemo(() => isSameDay(days[6], lastDay), [days, lastDay]);
  const dividerIndex = useMemo(() => days.findIndex((day) => !isSameMonth(day, lastDay)), [days, lastDay]);

  return useMemo(() => (
    <div className="calendar-week">
      {(isNewMonthInWeek || isLastDayInMonth) && (
      <>
        <img
          className={cn('calendar-week__divider', `calendar-week__divider--${dividerIndex}`)}
          src="/assets/svg/datepicker-divider.svg"
          alt="divider"
        />
        <div className="calendar-week__month">
          {month}
          {isShowYear && <span className="calendar-week__year">{year}</span>}
        </div>
      </>
      )}
      {
        days.map((day) => {
          const isSelected = selectedDates?.length ? selectedDates.some((date) => isSameDay(day, date)) : false;
          return (
            <CalendarDay
              key={day.getTime()}
              date={day}
              isSelected={isSelected}
              highlightDate={highlightDate}
              onSelectDate={onSelectDate}
            />
          );
        })
      }
    </div>
  ), [
    isNewMonthInWeek, isLastDayInMonth, dividerIndex,
    month, isShowYear, year, days,
    selectedDates, highlightDate,
  ]);
};
