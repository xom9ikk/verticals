import React from 'react';
import { ColumnToolbar } from '@comp/ColumnToolbar';

export default {
  title: 'ColumnToolbar',
  argTypes: {
    isEnabled: { control: { type: 'boolean' }, defaultValue: true },
    isHoverBlock: { control: { type: 'boolean' }, defaultValue: true },
    onAddCard: { action: 'add card' },
    onAddHeading: { action: 'add heading' },
  },
};

export const Default = (args: any) => <ColumnToolbar {...args} />;
