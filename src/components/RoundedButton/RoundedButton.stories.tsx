import React from 'react';
import { RoundedButton } from '@comp/RoundedButton';
import { EnumColors } from '@type/entities';

export default {
  title: 'RoundedButton',
  argTypes: {
    icon: { control: { type: 'text' }, defaultValue: '/assets/svg/menu/add-board.svg' },
    isSpecialIcon: { control: { type: 'boolean' }, defaultValue: false },
    color: {
      control: {
        type: 'select',
        options: Object.values(EnumColors).filter((v) => typeof v === 'number'),
      },
    },
    text: { control: { type: 'text' }, defaultValue: 'Add board' },
    isActive: { control: { type: 'boolean' }, defaultValue: false },
    onClick: { action: 'clicked' },
    onDoubleClick: { action: 'double clicked' },
    onMouseOver: { action: 'mouse over' },
    onMouseOut: { action: 'mouse out' },
  },
};

export const Default = (args: any) => <RoundedButton {...args} />;

export const Active = (args: any) => <RoundedButton {...args} isActive />;

export const Colored = (args: any) => <RoundedButton {...args} color={EnumColors.Green} />;

export const AlwaysColoredIcon = (args: any) => <RoundedButton {...args} isSpecialIcon />;
