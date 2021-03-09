import React from 'react';
import { Modal } from '@comp/Modal';

export default {
  title: 'Modal',
  argTypes: {
    isOpen: { control: { type: 'boolean' }, defaultValue: true },
    type: { control: { type: 'select', options: ['button', 'submit'] }, defaultValue: 'button' },
    isSoftExit: { control: { type: 'boolean' }, defaultValue: true },
    negative: { control: { type: 'text' }, defaultValue: 'Negative text' },
    positive: { control: { type: 'text' }, defaultValue: 'Positive text' },
    onPositive: { action: 'positive' },
    onNegative: { action: 'negative' },
    onClose: { action: 'close' },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] }, defaultValue: 'medium' },
  },
};

export const Default = (args: any) => <Modal {...args} />;
