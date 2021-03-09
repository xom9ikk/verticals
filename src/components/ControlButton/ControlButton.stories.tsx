import React from 'react';
import { ControlButton } from '@comp/ControlButton';
import ReactTooltip from 'react-tooltip';

export default {
  title: 'ControlButton',
  argTypes: {
    imageSrc: { control: { type: 'text' }, defaultValue: '/assets/svg/add.svg' },
    text: { control: { type: 'text' }, defaultValue: 'New workspace' },
    alt: { control: { type: 'text' }, defaultValue: 'add' },
    tooltip: { control: { type: 'text' }, defaultValue: undefined },
    imageSize: { control: { type: 'range', min: 1, max: 500 }, defaultValue: 12 },
    animationDuration: { control: { type: 'range', min: 1, max: 1000 }, defaultValue: 100 },
    size: { control: { type: 'range', min: 1, max: 500 }, defaultValue: undefined },
    isHide: { control: { type: 'boolean' }, defaultValue: false },
    isInvisible: { control: { type: 'boolean' }, defaultValue: false },
    isHoverBlock: { control: { type: 'boolean' }, defaultValue: true },
    isMaxWidth: { control: { type: 'boolean' }, defaultValue: true },
    isInvertColor: { control: { type: 'boolean' }, defaultValue: false },
    isPrimary: { control: { type: 'boolean' }, defaultValue: false },
    isColored: { control: { type: 'boolean' }, defaultValue: false },
    isTextable: { control: { type: 'boolean' }, defaultValue: false },
    isStopPropagation: { control: { type: 'boolean' }, defaultValue: false },
    onClick: { action: 'clicked' },
    onDoubleClick: { action: 'double clicked' },
    onMouseEnter: { action: 'mouse enter' },
    onMouseLeave: { action: 'mouse leave' },
  },
  decorators: [
    (Story: any) => (
      <>
        <ReactTooltip
          id="tooltip"
          place="top"
          effect="solid"
          multiline
          arrowColor="transparent"
          overridePosition={({ left, top }) => ({ left, top })}
        />
        <Story />
      </>
    ),
  ],
};

export const Default = (args: any) => <ControlButton {...args} />;
export const AddDate = (args: any) => (
  <ControlButton
    {...args}
    text={undefined}
    imageSrc="/assets/svg/calendar.svg"
    tooltip="Date"
    alt="date"
    imageSize={24}
    size={36}
    isColored
    isMaxWidth={false}
  />
);
export const AttachFile = (args: any) => (
  <ControlButton
    {...args}
    text={undefined}
    imageSrc="/assets/svg/attach.svg"
    tooltip="Attach a file"
    alt="file"
    imageSize={16}
    size={20}
    isColored
    isMaxWidth={false}
  />
);
export const MenuDots = (args: any) => (
  <ControlButton
    {...args}
    text={undefined}
    imageSrc="/assets/svg/dots.svg"
    alt="menu"
    imageSize={16}
    size={22}
    isMaxWidth={false}
  />
);
