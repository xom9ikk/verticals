import React from 'react';
import { Bullet } from '@comp/Bullet/index';
import { EnumCardType, EnumTodoStatus } from '@type/entities';

export default {
  title: 'Bullet',
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: Object.values(EnumCardType).filter((v) => typeof v === 'number'),
      },
      defaultValue: EnumCardType.Arrows,
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
export const Checkbox = (args: any) => <Bullet {...args} type={EnumCardType.Checkboxes} />;
export const Arrow = (args: any) => <Bullet {...args} type={EnumCardType.Arrows} />;
export const Dash = (args: any) => <Bullet {...args} type={EnumCardType.Dashes} />;
export const Dots = (args: any) => <Bullet {...args} type={EnumCardType.Dots} />;
