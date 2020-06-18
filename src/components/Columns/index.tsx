import React, { FC } from 'react';
import { Column } from '../Column';

interface IColumns {
  data: Array<{ id: string; title: string, description: string, todos: Array<any> }>
}

export const Columns: FC<IColumns> = ({ data }) => (
  <div className="columns">
    {
      data.map(({
        id, title, description, todos,
      }) => (
        <Column
          key={id}
          title={title}
          description={description}
          todos={todos}
        />
      ))
      }
    <Column
      key={`${data[0].id}new`}
      title=""
      description=""
      todos={[]}
    />
  </div>
);
