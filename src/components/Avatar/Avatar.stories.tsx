import React from 'react';
import ReactTooltip from 'react-tooltip';

import { Avatar } from '@comp/Avatar/index';

export default {
  title: 'Avatar',
  argTypes: {
    userAvatarUrl: {
      control: { type: 'text' },
      defaultValue:
          'https://avatars.githubusercontent.com/u/39026593?s=460&u=aa4efc89a4c0a11d316d50b0a567d8c85d09b0bf&v=4',
    },
    userFullName: { control: { type: 'text' }, defaultValue: 'Max Romanyuta' },
    size: { control: { type: 'range', min: 1, max: 500 }, defaultValue: 50 },
    borderSize: { control: { type: 'select', options: ['small', 'medium', 'large'] }, defaultValue: 'medium' },
    onClick: { action: 'clicked' },
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
        />
        <Story />
      </>
    ),
  ],
};

export const Default = (args: any) => <Avatar {...args} />;
