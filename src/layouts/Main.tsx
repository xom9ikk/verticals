import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sidebar } from '../components/Sidebar';
import { Columns } from '../components/Columns';
import { SystemActions } from '../store/actions';
import { IRootState } from '../store/reducers/state';

// const dataV2 = {};
// data.forEach((el) => {
//   // @ts-ignore
//   dataV2[el.id] = {
//     title: el.title,
//     description: el.description,
//     todos: el.todos,
//   };
// });

export const Main: FC = () => {
  const dispatch = useDispatch();
  const { columns, todos } = useSelector((state: IRootState) => state);
  const [preparedData, setPreparedData] = useState<any>();

  useEffect(() => {
    const data = {};
    columns?.forEach((column) => {
      // @ts-ignore
      data[column.id] = {
        title: column.title,
        description: column.description,
        todos: todos.filter((todo) => todo.columnId === column.id),
      };
    });
    console.log('new prepareddata', data);
    setPreparedData(data);
  }, [todos]);

  const keydownHandler = (event: any) => {
    switch (event.code) {
      case 'Escape': {
        dispatch(SystemActions.setIsOpenPopup(false));
        dispatch(SystemActions.setIsEditableCard(false));
        break;
      }
      default: break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, []);

  return (
    <div className="container container--horizontal">
      <Sidebar />
      <Columns
        initialColumns={preparedData}
      />
    </div>
  );
};
