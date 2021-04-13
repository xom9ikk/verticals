import React from 'react';

import { Divider } from '@comp/Divider';

export default {
  title: 'Divider',
  argTypes: {
    verticalSpacer: { control: { type: 'range', min: 1, max: 500 }, defaultValue: 10 },
    horizontalSpacer: { control: { type: 'range', min: 1, max: 500 }, defaultValue: 30 },
  },
  parameters: {
    backgrounds: {
      default: null,
    },
  },
};

export const Default = (args: any) => <Divider {...args} />;
export const CustomHeight = (args: any) => <Divider {...args} style={{ height: 2 }} />;
