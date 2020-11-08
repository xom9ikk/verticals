import React, { FC } from 'react';

interface ICardAttachments {
  id?: number,
  isCollapse: boolean,
}

const attachments = [{
  extension: 'png',
  name: 'a.png',
  path: 'https://a.com',
}, {
  extension: 'png',
  name: 'a.png',
  path: 'https://a.com',
}, {
  extension: 'png',
  name: 'a.png',
  path: 'https://a.com',
}, {
  extension: 'png',
  name: 'ad s v sdv dsv dv v ds.png',
  path: 'https://a.com',
}, {
  extension: 'png',
  name: 'a.png',
  path: 'https://a.com',
}, {
  extension: 'png',
  name: 'a.png',
  path: 'https://a.com',
}, {
  extension: 'png',
  name: 'a.png',
  path: 'https://a.com',
}, {
  extension: 'png',
  name: 'a.png',
  path: 'https://a.com',
}, {
  extension: 'png',
  name: 'a.png',
  path: 'https://a.com',
}, {
  extension: 'png',
  name: 'a.png',
  path: 'https://a.com',
}, {
  extension: 'png',
  name: 'a.png',
  path: 'https://a.com',
}, {
  extension: 'png',
  name: 'a.png',
  path: 'https://a.com',
}, {
  extension: 'png',
  name: 'a.png',
  path: 'https://a.com',
}, {
  extension: 'png',
  name: 'a.png',
  path: 'https://a.com',
}, {
  extension: 'png',
  name: 'a.png',
  path: 'https://a.com',
}];

export const CardAttachments: FC<ICardAttachments> = ({
  isCollapse,
}) => (
  <div className={`card-attachments 
  ${isCollapse ? 'card-attachments--collapse' : ''}`}
  >
    {
      attachments.map((attachment) => (
        <div className="card-attachment">
          <div className="comment-file__extension">
            <img src="/assets/svg/extension.svg" alt="extension" />
            <span>
              {attachment.extension.substring(0, 4)}
            </span>
          </div>
          <span className="card-attachment__name">
            {attachment.name}
          </span>
        </div>
      ))
    }
  </div>
);
