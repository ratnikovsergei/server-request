import { useSelector, useDispatch } from "react-redux";
import { useDebounce } from "use-debounce";
import { deleteAllTodos } from "../../redux/todo-app/todoActions";
import { TodoItem } from "../../entities/TodoItem/TodoItem";

export const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const filter = useSelector((state) => state.filter.filter);
  const ascending = useSelector((state) => state.sort.ascending);
  const [debouncedFilterValue] = useDebounce(filter, 300);

  const handleDeleteAllTodos = dispatch(deleteAllTodos);

  const sortedTodos = ascending
    ? [...todos].sort((a, b) => (a.title > b.title ? 1 : -1))
    : todos;

  const filteredTodos = sortedTodos.filter((todo) =>
    todo.title.toLowerCase().includes(debouncedFilterValue.toLowerCase())
  );

  console.log(todos);

  return (
    <div>
      {filteredTodos.map((todo, index) => (
        <TodoItem key={index} todo={todo} />
      ))}
      <div>
        {filteredTodos.length > 0 ? (
          <button onClick={() => handleDeleteAllTodos}>Очистить список задач</button>
        ) : null}
      </div>
    </div>
  );
};
