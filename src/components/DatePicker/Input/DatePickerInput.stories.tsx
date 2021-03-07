import React from 'react';
import { DatePickerInput } from '@comp/DatePicker/Input';

export default {
  title: 'DatePickerInput',
  argTypes: {
    isOpen: { control: { type: 'boolean' }, defaultValue: true },
    onChange: { action: 'change' },
  },
};

export const Default = (args: any) => <DatePickerInput {...args} />;
