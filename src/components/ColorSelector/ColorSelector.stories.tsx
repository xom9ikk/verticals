import React from 'react';
import { ColorSelector } from '@comp/ColorSelector';
import { colors } from '@type/entities';

export default {
  title: 'ColorSelector',
  argTypes: {
    color: {
      control: {
        type: 'color',
      },
      defaultValue: colors[2],
    },
    isActive: { control: { type: 'boolean' }, defaultValue: false },
    onClick: { action: 'pick color' },
  },
};

export const Default = (args: any) => <ColorSelector {...args} />;
