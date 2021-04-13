import React from 'react';

import { Calendar } from '@comp/DatePicker/Calendar';

export default {
  title: 'Calendar',
  argTypes: {
    medianDate: { control: { type: 'date' }, defaultValue: new Date(2020, 11, 11) },
    selectedDates: { control: { type: 'date' }, defaultValue: new Date(2020, 11, 11) },
    highlightDate: { control: { type: 'date' }, defaultValue: undefined },
    onSelectDate: { action: 'select' },
  },
  parameters: {
    backgrounds: {
      default: null,
    },
  },
};

export const Default = (args: any) => <Calendar {...args} />;
export const WithHighlightedDateInPast = (args: any) => (
  <Calendar
    {...args}
    highlightDate={new Date(2020, 11, 10)}
  />
);
export const WithHighlightedDateInFuture = (args: any) => (
  <Calendar
    {...args}
    medianDate={new Date(2031, 11, 10)}
    highlightDate={new Date(2031, 11, 10)}
  />
);
export const WithSelectedDatesInPast = (args: any) => (
  <Calendar
    {...args}
    medianDate={new Date(2020, 11, 10)}
    selectedDates={[new Date(2020, 11, 10), new Date(2020, 11, 11)]}
  />
);
export const WithSelectedDatesInFuture = (args: any) => (
  <Calendar
    {...args}
    medianDate={new Date(2031, 11, 10)}
    selectedDates={[new Date(2031, 11, 10), new Date(2031, 11, 11)]}
  />
);
