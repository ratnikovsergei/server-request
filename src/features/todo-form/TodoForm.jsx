import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteAllTodos,
  setSearch,
  toggleSort,
} from "../../redux/todo-app/todoActions";
import { BsPlus, BsSearch, BsSortAlphaDown, BsSortAlphaUpAlt } from "react-icons/bs";

export const TodoForm = () => {
  const dispatch = useDispatch();
  const ascending = useSelector((state) => state.sort.ascending);
  const [task, setTask] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleAddTodo = () => {
    if (task.trim()) {
      dispatch(addTodo({ id: Date.now(), title: task, completed: false }));
      setTask("");
    }
  };

  const handleDeleteTodos = () => {
    dispatch(deleteAllTodos());
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
    dispatch(setSearch(value));
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
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Поиск задачи"
            className="flex-grow p-1.75 border-b-2 bg-white border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <span className="ml-4">
            <BsSearch size={20} />
          </span>
        </div>
        <div className="flex space-x-4">
          <button
            className="text-sm px-2 py-1 bg-red-500 text-white rounded"
            onClick={handleDeleteTodos}
          >
            Очистить список
          </button>
          <button
            className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            onClick={handleToggleSort}
          >
            {ascending ? <BsSortAlphaUpAlt size={20} /> : <BsSortAlphaDown size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};
