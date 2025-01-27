import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, setFilter, toggleSort } from "../../redux/todo-app/todoActions";
import { BsPlus, BsSearch, BsArrowDownUp } from "react-icons/bs";

export const TodoForm = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const handleAddTodo = () => {
    if (task.trim()) {
      dispatch(addTodo({ id: Date.now(), title: task, completed: false }));
      setTask("");
    }
  };

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
    dispatch(setFilter(filterValue));
  };

  const handleToggleSort = () => {
    dispatch(toggleSort());
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Новая задача..."
          className="flex-grow p-1.75 border-b-2 bg-white border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleAddTodo}
          className="ml-4 p-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none"
        >
          <BsPlus size={20} />
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={filterValue}
            onChange={handleFilterChange}
            placeholder="Поиск задачи"
            className="flex-grow p-1.75 border-b-2 bg-white border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <span className="ml-4">
            <BsSearch size={20} />
          </span>
        </div>
        <button
          className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          onClick={handleToggleSort}
        >
          <BsArrowDownUp size={20} />
        </button>
      </div>
    </div>
  );
};
