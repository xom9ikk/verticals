import React from 'react';
import { DatePickerTag } from '@comp/DatePicker/Tag';

export default {
  title: 'DatePickerTag',
  argTypes: {
    date: { control: { type: 'date' }, defaultValue: new Date() },
    onRemove: { action: 'remove' },
  },
  parameters: {
    backgrounds: {
      default: null,
    },
  },
};

export const Default = (args: any) => <DatePickerTag {...args} />;
