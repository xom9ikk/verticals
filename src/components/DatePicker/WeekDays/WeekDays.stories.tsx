import React from 'react';
import { DatePickerWeekDays } from '@comp/DatePicker/WeekDays';

export default {
  title: 'DatePickerWeekDays',
  parameters: {
    backgrounds: {
      default: null,
    },
  },
};

export const Default = (args: any) => <DatePickerWeekDays {...args} />;
