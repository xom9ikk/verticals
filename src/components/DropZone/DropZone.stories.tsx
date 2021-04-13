import React from 'react';

import { DropZone } from '@comp/DropZone';

export default {
  title: 'DropZone',
  argTypes: {
    size: { control: { type: 'select', options: ['small', 'large'] }, defaultValue: 'small' },
    accept: { control: { type: 'text' }, defaultValue: '*' },
    onOpen: { action: 'opened' },
  },
};

const Children = ({ height }: any) => (
  <div style={{
    width: '100%',
    height,
    background: '#f34453',
    color: '#f2f2f2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  }}
  >
    I am children
  </div>
);

export const Default = (args: any) => (
  <DropZone {...args}>
    <Children height="100px" />
  </DropZone>
);

export const Large = (args: any) => (
  <DropZone {...args} size="large">
    <Children height="400px" />
  </DropZone>
);
