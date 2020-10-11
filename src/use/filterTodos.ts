import { useSelector } from 'react-redux';
import { ITodo } from '@/types/entities';
import { IRootState } from '@/store/reducers/state';

export const useFilterTodos = () => {
  const query = useSelector((state: IRootState) => state.system.query);

  const filterTodos = (todo: ITodo) => {
    const lowerCaseQuery = query.toLocaleLowerCase();
    const lowerCaseTitle = todo.title.toLocaleLowerCase();
    const lowerCaseDescription = todo.description?.toLocaleLowerCase() || '';
    return lowerCaseTitle.includes(lowerCaseQuery)
        || lowerCaseDescription.includes(lowerCaseQuery);
  };

  return {
    filterTodos,
  };
};
