import React from 'react';
import { ColorPicker } from '@comp/ColorPicker';
import { EnumColors } from '@type/entities';

export default {
  title: 'ColorPicker',
  argTypes: {
    activeColor: {
      control: {
        type: 'select',
        options: [...Object.values(EnumColors).filter((v) => typeof v === 'number'), null],
      },
      defaultValue: EnumColors.Turquoise,
    },
    onPick: { action: 'change color' },
  },
};

export const Default = (args: any) => <ColorPicker {...args} />;
