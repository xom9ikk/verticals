import React from 'react';

import { TextArea } from '@comp/TextArea';

export default {
  title: 'TextArea',
  argTypes: {
    className: { control: { type: 'text' }, defaultValue: '' },
    name: { control: { type: 'text' }, defaultValue: 'column' },
    value: { control: { type: 'text' }, defaultValue: 'Value already here' },
    placeholder: { control: { type: 'text' }, defaultValue: 'Just placeholder' },
    minRows: { control: { type: 'range', min: 1, max: 50 }, defaultValue: 2 },
    maxRows: { control: { type: 'range', min: 1, max: 50 }, defaultValue: 8 },
    onChange: { action: 'change' },
    onBlur: { action: 'blur' },
    onKeyUp: { action: 'key up' },
    onKeyDown: { action: 'key down' },
    onKeyDownCapture: { action: 'key down capture' },
    onChangeHeight: { action: 'change height' },
  },
  parameters: {
    backgrounds: {
      default: null,
    },
  },
};

export const Default = (args: any) => <TextArea {...args} />;
export const Empty = (args: any) => <TextArea {...args} value="" />;
export const OneRow = (args: any) => <TextArea {...args} minRows={1} maxRows={1} />;
export const OneToFive = (args: any) => (
  <TextArea
    {...args}
    minRows={1}
    maxRows={5}
    value={new Array(1000).fill(0).join('')}
  />
);
