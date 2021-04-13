import React from 'react';

import { DatePicker } from '@comp/DatePicker';

export default {
  title: 'DatePicker',
  argTypes: {
    selectedDate: { control: { type: 'date' }, defaultValue: new Date(2031, 11, 7) },
    isOpen: { control: { type: 'boolean' }, defaultValue: true },
    onSelectDate: { action: 'select' },
  },
  parameters: {
    backgrounds: {
      default: null,
    },
  },
};

export const Default = (args: any) => <DatePicker {...args} medianDate={new Date(2031, 11, 11)} />;
