import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import subWeeks from 'date-fns/subWeeks';
import addWeeks from 'date-fns/addWeeks';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval';
import { CalendarWeek } from '@comp/DatePicker/Calendar/Week';
import { useDebounce } from '@use/debounce';

interface ICalendar {
  medianDate?: Date;
  selectedDates?: Array<Date>;
  highlightDate?: Date | null;
  onSelectDate: (date: Date) => void;
}

const WEEKS_RANGE = 4 * 12;
const WEEK_HEIGHT = 30;
const MONTH_HEIGHT = WEEK_HEIGHT * 4;
const HALF_YEAR_HEIGHT = MONTH_HEIGHT * 6;

export const Calendar: FC<ICalendar> = ({
  medianDate = new Date(),
  selectedDates,
  highlightDate = null,
  onSelectDate,
}) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [weeks, setWeeks] = useState<Array<Date>>([]);

  const containerRef = useRef<any>();

  useEffect(() => {
    const today = medianDate;
    setStartDate(subWeeks(today, WEEKS_RANGE));
    setEndDate(addWeeks(today, WEEKS_RANGE));
  }, []);

  const recalculateCalendar = () => {
    const start = startOfMonth(startDate);
    const end = endOfMonth(endDate);
    setWeeks(eachWeekOfInterval({
      start,
      end,
    }));
  };

  useEffect(() => {
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = WEEK_HEIGHT * WEEKS_RANGE - 1.5 * WEEK_HEIGHT;
      }
    });

    recalculateCalendar();
  }, [startDate]);

  useEffect(() => {
    recalculateCalendar();
  }, [endDate]);

  const handleScroll = useDebounce((e) => {
    const { scrollTop: currentPosition, scrollHeight: max } = e.target;

    const minThreshold = HALF_YEAR_HEIGHT;
    const maxThreshold = max - HALF_YEAR_HEIGHT;

    if (currentPosition < minThreshold) {
      setStartDate(subWeeks(startDate, WEEKS_RANGE));
      setEndDate(subWeeks(endDate, WEEKS_RANGE));
    }

    if (currentPosition > maxThreshold) {
      setStartDate(addWeeks(startDate, WEEKS_RANGE));
      setEndDate(addWeeks(endDate, WEEKS_RANGE));
    }
  }, 100, [startDate, endDate]);

  return (
    <div
      ref={containerRef}
      className="calendar"
      onScroll={handleScroll}
    >
      {weeks.map((start) => (
        <CalendarWeek
          key={start.getTime()}
          highlightDate={highlightDate}
          selectedDates={selectedDates}
          startDate={start}
          onSelectDate={onSelectDate}
        />
      ))}
    </div>
  );
};
