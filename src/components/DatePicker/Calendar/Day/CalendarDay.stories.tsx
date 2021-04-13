import React from 'react';

import { CalendarDay } from '@comp/DatePicker/Calendar/Day';

export default {
  title: 'CalendarDay',
  argTypes: {
    date: { control: { type: 'date' }, defaultValue: new Date(2020, 11, 11) },
    isSelected: { control: { type: 'boolean' }, defaultValue: false },
    highlightDate: { control: { type: 'date' }, defaultValue: undefined },
    onSelectDate: { action: 'select' },
  },
  parameters: {
    backgrounds: {
      default: null,
    },
  },
};

export const Default = (args: any) => <CalendarDay {...args} />;
export const SelectedDay = (args: any) => <CalendarDay {...args} isSelected />;
export const DayInFuture = (args: any) => <CalendarDay {...args} date={new Date(2222, 1, 7)} />;
export const WeekendDay = (args: any) => <CalendarDay {...args} date={new Date(2222, 1, 2)} />;
