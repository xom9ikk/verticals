import React from 'react';
import { FallbackLoader } from '@comp/FallbackLoader';

export default {
  title: 'FallbackLoader',
  argTypes: {
    backgroundColor: { control: { type: 'text' }, defaultValue: '#ffffff' },
    isLoading: { control: { type: 'boolean' }, defaultValue: true },
    isFixed: { control: { type: 'boolean' }, defaultValue: false },
    isAbsolute: { control: { type: 'boolean' }, defaultValue: false },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] }, defaultValue: 'small' },
    delay: { control: { type: 'range', min: 1, max: 1500 }, defaultValue: 500 },
    minimumZIndex: { control: { type: 'number' }, defaultValue: 1 },
  },
};

export const Default = (args: any) => (
  <FallbackLoader {...args} />
);

export const Medium = (args: any) => (
  <FallbackLoader {...args} size="medium" />
);

export const Large = (args: any) => (
  <FallbackLoader {...args} size="large" />
);

export const Fixed = (args: any) => (
  <FallbackLoader {...args} isFixed />
);

export const Loaded = (args: any) => (
  <FallbackLoader {...args} isLoading={false} />
);
