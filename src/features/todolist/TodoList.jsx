import { useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { TodoItem } from "../../entities/TodoItem/TodoItem";

export const TodoList = () => {
  const todos = useSelector((state) => state.todos.todos);
  const search = useSelector((state) => state.search.searchValue);
  const ascending = useSelector((state) => state.sort.ascending);
  const [debouncedFilterValue] = useDebounce(search, 300);

  const sortedTodos = ascending
    ? [...todos].sort((a, b) => (a.title > b.title ? 1 : -1))
    : todos;

  const filteredTodos = sortedTodos.filter((todo) =>
    todo.title.toLowerCase().includes(debouncedFilterValue.toLowerCase())
  );

  return (
    <div>
      {filteredTodos.map((todo, index) => (
        <TodoItem key={index} todo={todo} index={index} />
      ))}
    </div>
  );
};
