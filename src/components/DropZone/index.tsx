import cn from 'classnames';
import React, { FC, SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useFileList } from '@use/fileList';

const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE);

interface IDropZone {
  onOpen: (files: FileList) => void;
  size?: 'small' | 'large';
  accept?: string;
}

export const DropZone: FC<IDropZone> = ({
  onOpen,
  size = 'large',
  accept = '*',
  children,
}) => {
  const { t } = useTranslation();
  const { restrictFileSize } = useFileList();
  const [isDrag, setIsDrag] = useState<boolean>(false);

  const handleDrop = (event: any) => {
    const filteredFiles = restrictFileSize(event.dataTransfer.files, MAX_FILE_SIZE);
    onOpen(filteredFiles!);
    setIsDrag(false);
  };

  const handleDrag = (event: React.DragEvent) => {
    if (event?.dataTransfer?.items?.length) {
      const items = [...event?.dataTransfer?.items];
      const isContainsFile = items.some((item) => item.kind === 'file');
      if (isContainsFile) {
        setIsDrag(true);
      }
    }
  };

  const handleClick = (event: SyntheticEvent) => event.stopPropagation();

  const handleDragLeave = () => {
    setIsDrag(false);
  };

  return (
    <div
      onDragEnter={handleDrag}
      className="drop-zone"
    >
      {children}
      <div
        className={cn('drop-zone__overlay', `drop-zone__overlay--${size}`, {
          'drop-zone__overlay--hidden': !isDrag,
        })}
        onDragLeave={handleDragLeave}
      >
        <h3>{t('Drop files here')}</h3>
        <input
          type="file"
          accept={accept}
          multiple
          className="drop-zone__input"
          onDrop={handleDrop}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};
