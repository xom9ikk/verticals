import React from 'react';

import { CalendarWeek } from '@comp/DatePicker/Calendar/Week';

export default {
  title: 'CalendarWeek',
  argTypes: {
    startDate: { control: { type: 'date' }, defaultValue: new Date(2020, 1, 9) },
    highlightDate: { control: { type: 'date' }, defaultValue: undefined },
    onSelectDate: { action: 'select' },
  },
  parameters: {
    backgrounds: {
      default: null,
    },
  },
};

export const Default = (args: any) => <CalendarWeek {...args} />;
export const WeekInFuture = (args: any) => <CalendarWeek {...args} startDate={new Date(2222, 1, 3)} />;
export const WeekWithSelectedDate = (args: any) => (
  <CalendarWeek
    {...args}
    startDate={new Date(2222, 1, 3)}
    highlightDate={new Date(2222, 1, 5)}
  />
);
