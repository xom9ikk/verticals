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
import i18n from '@/i18n';

const months = [
  i18n.t('January'),
  i18n.t('February'),
  i18n.t('March'),
  i18n.t('April'),
  i18n.t('May'),
  i18n.t('June'),
  i18n.t('July'),
  i18n.t('August'),
  i18n.t('September'),
  i18n.t('October'),
  i18n.t('November'),
  i18n.t('December'),
];

interface ICalendarWeek {
  startDate: Date;
  selectedDates?: Array<Date>;
  highlightDate?: Date | null;
  onSelectDate: (date: Date) => void;
}

export const CalendarWeek: FC<ICalendarWeek> = ({
  startDate,
  selectedDates,
  highlightDate = null,
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
  const isShowYear = useMemo(() => !isThisYear(endDate), [endDate]);

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
