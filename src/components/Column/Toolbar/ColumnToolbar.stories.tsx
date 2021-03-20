import React from 'react';
import { ColumnToolbar } from '@comp/Column/Toolbar';

export default {
  title: 'ColumnToolbar',
  argTypes: {
    isEnabled: { control: { type: 'boolean' }, defaultValue: true },
    onAddCard: { action: 'add card' },
    onAddHeading: { action: 'add heading' },
  },
  parameters: { loki: { skip: true } },
};

export const Default = (args: any) => <ColumnToolbar {...args} />;
