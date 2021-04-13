import useKeys from '@rooks/use-keys';
import isValid from 'date-fns/isValid';
import React, { FC, useState } from 'react';
// @ts-ignore
import createDate from 'sugar/date/create';

import { Calendar } from '@comp/DatePicker/Calendar';
import { DatePickerInput } from '@comp/DatePicker/Input';
import { DatePickerTag } from '@comp/DatePicker/Tag';
import { DatePickerWeekDays } from '@comp/DatePicker/WeekDays';
import { Divider } from '@comp/Divider';
import { useEffectState } from '@use/effectState';
import { useNormalizeDate } from '@use/normalizeDate';

interface IDatePicker {
  medianDate?: Date;
  isOpen: boolean;
  selectedDate?: Date | null;
  onSelectDate: (payload: Date | null) => void;
}

export const DatePicker: FC<IDatePicker> = ({
  medianDate = new Date(),
  isOpen,
  selectedDate = null,
  onSelectDate,
}) => {
  const { normalizeDate } = useNormalizeDate();
  const [date, setDate] = useEffectState<Date | null>(selectedDate);
  const [highlightDate, setHighlightDate] = useState<Date | null>(null);

  const postHandlerSelectDate = (d: Date | null) => {
    const normalizedDate = normalizeDate(d);
    onSelectDate(normalizedDate);
  };

  const handleSelectDate = (d: Date) => {
    setDate(d);
    postHandlerSelectDate(d);
  };

  const handleInput = (e: React.BaseSyntheticEvent) => {
    const inputValue = e.target.value;
    setHighlightDate(createDate(inputValue));
  };

  const handleRemove = () => {
    setDate(null);
    postHandlerSelectDate(null);
  };

  const handleSubmit = () => {
    console.log(highlightDate);
    if (highlightDate !== undefined && isValid(highlightDate)) {
      setDate(highlightDate);
      postHandlerSelectDate(highlightDate);
      setHighlightDate(null);
    }
  };

  useKeys(['Enter'], handleSubmit, {
    when: isOpen,
  });

  return isOpen ? (
    <div className="datepicker">
      {
        date ? (
          <DatePickerTag
            date={date}
            onRemove={handleRemove}
          />
        ) : (
          <DatePickerInput
            isOpen={isOpen}
            onChange={handleInput}
          />
        )
      }
      <DatePickerWeekDays />
      <Divider
        verticalSpacer={0}
        horizontalSpacer={0}
      />
      <Calendar
        medianDate={medianDate}
        onSelectDate={handleSelectDate}
        highlightDate={highlightDate}
        selectedDates={date ? [date] : []}
      />
    </div>
  ) : null;
};
