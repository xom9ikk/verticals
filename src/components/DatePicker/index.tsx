import React, { FC, useRef, useState } from 'react';
import isValid from 'date-fns/isValid';
// @ts-ignore
import createDate from 'sugar/date/create';
import { DatePickerInput } from '@comp/DatePicker/Input';
import { DatePickerWeekDays } from '@comp/DatePicker/WeekDays';
import { Divider } from '@comp/Divider';
import { Calendar } from '@comp/DatePicker/Calendar';
import { DatePickerTag } from '@comp/DatePicker/Tag';
import useKeys from '@rooks/use-keys';
import { Popup } from '@comp/Popup';

interface IDatePicker {
  isOpen: boolean;
  position?: 'top' | 'left' | 'right' | 'bottom' | 'normal';
  isAbsolute?: boolean;
  sourceRef?: any;
  selectedDate?: Date;
  onSelectDate: (payload: Date | undefined) => void;
}

export const DatePicker: FC<IDatePicker> = ({
  isOpen,
  position,
  isAbsolute = true,
  sourceRef,
  selectedDate,
  onSelectDate,
}) => {
  const ref = useRef<any>();
  const [date, setDate] = useState<Date | undefined>(selectedDate);
  const [highlightDate, setHighlightDate] = useState<Date>();

  const handleSelectDate = (d: Date) => {
    setDate(d);
    onSelectDate(d);
  };

  const handleInput = (e: React.BaseSyntheticEvent) => {
    const inputValue = e.target.value;
    setHighlightDate(createDate(inputValue));
  };

  const handleRemove = () => {
    setDate(undefined);
    onSelectDate(undefined);
  };

  const handleSubmit = () => {
    if (isValid(highlightDate)) {
      setDate(highlightDate);
      onSelectDate(highlightDate);
      setHighlightDate(undefined);
    }
  };

  useKeys(['Enter'], handleSubmit, {
    when: isOpen,
  });

  return (
    <Popup
      isOpen={isOpen}
      position={position}
      sourceRef={sourceRef}
      isAbsolute={isAbsolute}
      width={328}
      style={{ zIndex: 2 }}
    >
      <div className="datepicker">
        {
            date ? (
              <DatePickerTag
                date={date}
                onRemove={handleRemove}
              />
            ) : (
              <DatePickerInput
                ref={ref}
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
          onSelectDate={handleSelectDate}
          highlightDate={highlightDate}
          selectedDates={date ? [date] : []}
        />
      </div>
    </Popup>
  );
};
