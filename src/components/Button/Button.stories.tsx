import React from 'react';
import { Button } from '@comp/Button';

export default {
  title: 'Button',
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['button', 'submit'],
      },
      defaultValue: 'button',
    },
    modificator: {
      control: {
        type: 'select',
        options: ['primary', 'transparent', 'danger'],
      },
      defaultValue: 'transparent',
    },
    isMaxWidth: { control: { type: 'boolean' }, defaultValue: false },
    children: { control: { type: 'text' }, defaultValue: 'Sign in with Google' },
    onClick: { action: 'clicked' },
  },
};

export const Default = (args: any) => <Button {...args} />;
export const Transparent = (args: any) => <Button {...args} modificator="transparent">Sign In</Button>;
export const Primary = (args: any) => <Button {...args} modificator="primary">OK</Button>;
export const Danger = (args: any) => <Button {...args} modificator="danger">Delete account</Button>;
