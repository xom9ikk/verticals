import React from 'react';
import { Loader } from '@comp/Loader';

export default {
  title: 'Loader',
  argTypes: {
    size: { control: { type: 'range', min: 1, max: 1000 }, defaultValue: 25 },
    strokeWidth: { control: { type: 'range', min: 1, max: 50 }, defaultValue: 2 },
    strokeDashoffset: { control: { type: 'range', min: 1, max: 10000 }, defaultValue: 325 },
    isOpen: { control: { type: 'boolean' }, defaultValue: true },
  },
  decorators: [
    (Story: any) => (
      <div style={{ height: 400, width: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = (args: any) => (
  <Loader
    {...args}
    style={{
      position: 'absolute',
      width: args.size,
      height: args.size,
    }}
  />
);
