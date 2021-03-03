import React, { FC } from 'react';
import cn from 'classnames';
import { useDownload } from '@use/download';
import { getCommentFileAttachmentsByTodoId } from '@store/selectors';
import { useParamSelector } from '@use/paramSelector';

interface ICardAttachments {
  todoId?: number,
  isCollapse: boolean,
}

export const CardAttachments: FC<ICardAttachments> = ({
  todoId = null,
  isCollapse,
}) => {
  const { download } = useDownload();
  const attachments = useParamSelector(getCommentFileAttachmentsByTodoId, todoId);

  return attachments && attachments.length ? (
    <div className={cn('card-attachments', {
      'card-attachments--collapse': isCollapse,
    })}
    >
      <div className="card-attachments__inner">
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
    </div>
  ) : null;
};
