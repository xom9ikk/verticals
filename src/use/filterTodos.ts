import { useSelector } from 'react-redux';
import { ITodo } from '../types';
import { IRootState } from '../store/reducers/state';

export const useFilterTodos = () => {
  const { query } = useSelector((state: IRootState) => state.system);

  const filterTodos = (todo: ITodo) => {
    const lowerCaseQuery = query.toLocaleLowerCase();
    return todo.title?.toLocaleLowerCase().includes(lowerCaseQuery)
        || todo.description?.toLocaleLowerCase().includes(lowerCaseQuery);
  };

  return {
    filterTodos,
  };
};
