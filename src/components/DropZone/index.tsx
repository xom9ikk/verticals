import React, { FC, useState } from 'react';
import cn from 'classnames';
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
  const { restrictFileSize } = useFileList();
  const [isDrag, setIsDrag] = useState<boolean>(false);

  const handleDrop = (event: any) => {
    const filteredFiles = restrictFileSize(event.dataTransfer.files, MAX_FILE_SIZE);
    onOpen(filteredFiles!);
    setIsDrag(false);
  };

  return (
    <div
      onDragEnter={(event: React.DragEvent) => {
        if (event?.dataTransfer?.items?.length) {
          const items = [...event?.dataTransfer?.items];
          const isContainsFile = items.some((item) => item.kind === 'file');
          if (isContainsFile) {
            setIsDrag(true);
          }
        }
      }}
      className="drop-zone"
    >
      {children}
      <div
        className={cn('drop-zone__overlay', `drop-zone__overlay--${size}`, {
          'drop-zone__overlay--hidden': !isDrag,
        })}
        onDragLeave={() => {
          setIsDrag(false);
        }}
      >
        <h3>Drop files here</h3>
        <input
          type="file"
          accept={accept}
          multiple
          className="drop-zone__input"
          onDrop={handleDrop}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};
