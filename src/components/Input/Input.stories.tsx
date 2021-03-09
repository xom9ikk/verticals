import React from 'react';
import { Input } from '@comp/Input';

export default {
  title: 'Input',
  argTypes: {
    value: { control: { type: 'text' }, defaultValue: 'xom9ik.code@gmail.com' },
    type: { control: { type: 'text' }, defaultValue: 'email' },
    name: { control: { type: 'text' }, defaultValue: 'email' },
    width: { control: { type: 'range', min: 1, max: 1500 }, defaultValue: undefined },
    touched: { control: { type: 'boolean' }, defaultValue: false },
    error: { control: { type: 'text' }, defaultValue: 'Can\'t be blank' },
    onChange: { action: 'change' },
    onBlur: { action: 'blur' },
    onKeyDown: { action: 'key down' },
    placeholder: { control: { type: 'text' }, defaultValue: 'Enter your email...' },
    label: { control: { type: 'text' }, defaultValue: 'Email' },
    isMultiline: { control: { type: 'boolean' }, defaultValue: false },
    isLight: { control: { type: 'boolean' }, defaultValue: false },
    isDisable: { control: { type: 'boolean' }, defaultValue: false },
  },
};

export const Default = (args: any) => <Input {...args} />;
export const EmptyValue = (args: any) => <Input {...args} value="" />;
export const CustomWidth = (args: any) => <Input {...args} width={400} />;
export const TouchedAndEmpty = (args: any) => <Input {...args} touched value="" />;
export const CustomPlaceholder = (args: any) => <Input {...args} placeholder="Custom placeholder" value="" />;
export const Multiline = (args: any) => <Input {...args} isMultiline />;
export const Light = (args: any) => <Input {...args} isLight />;
export const Disabled = (args: any) => <Input {...args} isDisable />;
export const WithoutLabel = (args: any) => <Input {...args} label="" />;
