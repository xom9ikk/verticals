/* eslint-disable max-len */
import React from 'react';
import { CommentFormAttachments } from '@comp/CommentFormAttachments';

export default {
  title: 'CommentFormAttachments',
  argTypes: {
    isListView: { control: { type: 'boolean' }, defaultValue: false },
    onRemove: { action: 'remove' },
  },
};

export const Default = (args: any, { loaded: { files } }: any) => <CommentFormAttachments {...args} files={files} />;
export const ListView = (args: any, { loaded: { files } }: any) => <CommentFormAttachments {...args} files={files} isListView />;

const links = [
  'https://images.unsplash.com/photo-1531826267553-c4979aefab12?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1542144612-1b3641ec3459?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1542411580-722a76270c58?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1542395975-1913c2900823?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1542396601-dca920ea2807?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1521109464564-2fa2faa95858?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
];

const getFileByUrl = async (url: string, name: string, defaultType = 'image/jpeg') => {
  const response = await fetch(url);
  const data = await response.blob();
  return new File([data], name, {
    type: response.headers.get('content-type') || defaultType,
  });
};

const loaders = [
  async () => {
    const promises = links.map((link, index) => getFileByUrl(
      link,
      `file-${index}`,
    ));
    const files = await Promise.all(promises);
    return {
      files,
    };
  },
];

Default.loaders = loaders;
ListView.loaders = loaders;
