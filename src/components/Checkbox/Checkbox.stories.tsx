import React from 'react';

import { Checkbox } from '@comp/Checkbox';

export default {
  title: 'Checkbox',
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
      defaultValue: 'large',
    },
    isActive: { control: { type: 'boolean' }, defaultValue: false },
    onChange: { action: 'clicked' },
  },
};

export const Default = (args: any) => <Checkbox {...args} />;
