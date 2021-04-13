import cn from 'classnames';
import React, { FC } from 'react';

import { ICommentAttachments } from '@type/entities';
import { useDownload } from '@use/download';

interface ICardAttachments {
  files: ICommentAttachments,
  isCollapse: boolean,
}

export const CardAttachments: FC<ICardAttachments> = ({
  files,
  isCollapse,
}) => {
  const { download } = useDownload();

  return (
    <div className={cn('card-attachments', {
      'card-attachments--collapse': isCollapse,
    })}
    >
      <div className="card-attachments__inner">
        {files.map((file) => (
          <button
            key={file.path}
            className="card-attachment"
            onClick={(event) => {
              event.stopPropagation();
              download(file.path);
            }}
          >
            <div className="comment-file__extension">
              <img src="/assets/svg/extension.svg" alt="extension" />
              <span>
                {file.extension.substring(0, 4)}
              </span>
            </div>
            <span className="card-attachment__name">
              {file.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
