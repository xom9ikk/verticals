import React, { FC, useState } from 'react';

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
  const [isDrag, setIsDrag] = useState<boolean>(false);

  return (
    <div
      onDragEnter={(event: React.DragEvent) => {
        if (event?.dataTransfer?.items?.length) {
          setIsDrag(true);
        }
      }}
      className="drop-zone"
    >
      {children}
      <div
        className={`drop-zone__overlay 
        ${!isDrag ? 'drop-zone__overlay--hidden' : ''}
        drop-zone__overlay--${size}`}
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
          onDrop={(e) => {
            onOpen(e.dataTransfer.files);
            setIsDrag(false);
          }}
        />
      </div>
    </div>
  );
};
