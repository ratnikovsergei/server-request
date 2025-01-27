/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTodo, editTodo, toggleStatus } from "../../redux/todo-app/todoActions";
import { FaCheck, FaPen, FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";

export const TodoItem = ({ todo, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(todo.title);
  const dispatch = useDispatch();

  const handleEditTodo = () => {
    dispatch(editTodo(todo.id, { title: updatedText }));
    setIsEditing(false);
  };

  const handleToggleStatus = () => {
    dispatch(toggleStatus(todo.id));
  };

  const handleRemoveTodo = () => {
    dispatch(removeTodo(todo.id));
  };

  return (
    <li className="flex flex-col border-b-2 border-gray-200 py-2 gap-4">
      <div className="flex items-center">
        <span className="mr-4 text-gray-500">{index + 1}</span>
        {isEditing ? (
          <input
            type="text"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
            className="flex-grow bg-white border-blue-200 rounded"
          />
        ) : (
          <span
            className={`mr-4 flex-grow ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.title}
          </span>
        )}
        <div className="space-x-3 ml-8"></div>
        {isEditing ? (
          <button
            className="mr-2 text-sm bg-green-500 text-white px-1 py-1 rounded"
            onClick={handleEditTodo}
          >
            <FaCheck />
          </button>
        ) : (
          <button
            className="mr-2 text-sm bg-blue-400 text-white px-1 py-1 rounded"
            onClick={() => setIsEditing(true)}
          >
            <FaPen />
          </button>
        )}
        <button
          className="mr-2 text-sm bg-purple-400 text-white px-1 py-1 rounded"
          onClick={handleToggleStatus}
        >
          {todo.completed ? <FaToggleOff /> : <FaToggleOn />}
        </button>
        <button
          className="mr-2 text-sm bg-red-700 text-white px-1 py-1 rounded"
          onClick={handleRemoveTodo}
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
};
