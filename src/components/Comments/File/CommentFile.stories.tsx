import React from 'react';

import { CommentFile } from '@comp/Comments/File/index';

export default {
  title: 'CommentFile',
  argTypes: {
    id: { control: { type: 'number' }, defaultValue: 1 },
    size: { control: { type: 'number' }, defaultValue: 1843829322 },
    name: { control: { type: 'text' }, defaultValue: 'Backup data' },
    path: {
      control: { type: 'text' },
      defaultValue:
          'https://c4.wallpaperflare.com/wallpaper/539/371/639/landscape-mountains-water-wallpaper-preview.jpg',
    },
    extension: { control: { type: 'text' }, defaultValue: 'zip' },
    isImage: { control: { type: 'boolean' }, defaultValue: true },
    isCompact: { control: { type: 'boolean' }, defaultValue: true },
    onRemove: { action: 'remove' },
  },
};

export const Default = (args: any) => <CommentFile {...args} />;
export const CompactFile = (args: any) => <CommentFile {...args} isImage={false} isCompact />;
export const FullSizeFile = (args: any) => <CommentFile {...args} isImage={false} isCompact={false} />;
export const FullSizeImage = (args: any) => <CommentFile {...args} isImage isCompact={false} />;
