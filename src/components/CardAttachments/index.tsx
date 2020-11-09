import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useDownload } from '@/use/download';
import { getCommentFileAttachmentsByTodoId } from '@/store/selectors';

interface ICardAttachments {
  todoId?: number,
  isCollapse: boolean,
}

export const CardAttachments: FC<ICardAttachments> = ({
  todoId = null,
  isCollapse,
}) => {
  const { download } = useDownload();
  const attachments = useSelector(getCommentFileAttachmentsByTodoId(todoId));

  return attachments && attachments.length ? (
    <div className={`card-attachments 
  ${isCollapse ? 'card-attachments--collapse' : ''}`}
    >
      {
        attachments.map((attachment) => (
          <button
            key={attachment.path}
            className="card-attachment"
            onClick={(e) => {
              e.stopPropagation();
              download(attachment.path);
            }}
          >
            <div className="comment-file__extension">
              <img src="/assets/svg/extension.svg" alt="extension" />
              <span>
                {attachment.extension.substring(0, 4)}
              </span>
            </div>
            <span className="card-attachment__name">
              {attachment.name}
            </span>
          </button>
        ))
      }
    </div>
  ) : null;
};
