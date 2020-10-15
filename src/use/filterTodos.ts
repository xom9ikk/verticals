import { useSelector } from 'react-redux';
import { ITodo } from '@/types/entities';
import { getQuery } from '@/store/selectors';

export const useFilterTodos = () => {
  const query = useSelector(getQuery);

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
