import React from 'react';
import { Bullet } from '@comp/Bullet/index';
import { EnumTodoStatus, EnumTodoType } from '@type/entities';

export default {
  title: 'Bullet',
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: Object.values(EnumTodoType).filter((v) => typeof v === 'number'),
      },
      defaultValue: EnumTodoType.Arrows,
    },
    status: {
      control: {
        type: 'select',
        options: Object.values(EnumTodoStatus).filter((v) => typeof v === 'number'),
      },
      defaultValue: EnumTodoStatus.Done,
    },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] }, defaultValue: 'large' },
    onChangeStatus: { action: 'change status' },
  },
};

export const Default = (args: any) => <Bullet {...args} />;
export const Checkbox = (args: any) => <Bullet {...args} type={EnumTodoType.Checkboxes} />;
export const Arrow = (args: any) => <Bullet {...args} type={EnumTodoType.Arrows} />;
export const Dash = (args: any) => <Bullet {...args} type={EnumTodoType.Dashes} />;
export const Dots = (args: any) => <Bullet {...args} type={EnumTodoType.Dots} />;
export const Nothing = (args: any) => <Bullet {...args} type={EnumTodoType.Nothing} />;
