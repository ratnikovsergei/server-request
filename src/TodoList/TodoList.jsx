import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Link } from 'react-router-dom';
import { useGetTodos, useAddTodo } from '../hooks';
import './TodoList.css';

export const TodoList = () => {
  const [refreshTodos, setRefreshTodos] = useState(false);
  const { todos } = useGetTodos(refreshTodos);
  const { handleAddTodo, newTodo, setNewTodo, errorMsg } = useAddTodo(
    refreshTodos,
    setRefreshTodos,
    todos
  );

  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue] = useDebounce(searchValue, 300);
  const [isSorted, setIsSorted] = useState(false);

  const sortedList = isSorted
    ? [...todos].sort((a, b) => (a.title > b.title ? 1 : -1))
    : todos;

  const filteredList = sortedList.filter((todo) =>
    todo.title.toLowerCase().includes(debouncedSearchValue.toLowerCase())
  );

  return (
    <div className="main-container">
      <div className="upper-block">
        <div>
          <input
            type="text"
            name="new-todo"
            placeholder="Новая задача"
            value={newTodo}
            onChange={({ target }) => {
              setNewTodo(target.value);
            }}
          />
          <button className="add-btn" onClick={handleAddTodo} disabled={!newTodo}>
            Добавить
          </button>
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
        </div>
        <div>
          <input
            type="text"
            name="search-todo"
            placeholder="Поиск задачи"
            value={searchValue}
            onChange={({ target }) => setSearchValue(target.value)}
          />
          <button className="refresh-btn" onClick={() => setSearchValue('')}>
            Сбросить
          </button>
        </div>
      </div>
      <div id="todo-list">
        <h2>Задачи на сегодня:</h2>
        <div>
          <button onClick={() => setIsSorted(!isSorted)}>
            {isSorted ? 'Убрать сортировку' : 'Сортировка А-Я'}
          </button>
        </div>
        <ul>
          {todos.length === 0 ? (
            <p className="msg">На сегодня задач нет</p>
          ) : filteredList.length > 0 ? (
            filteredList.map(({ id, title }) => (
              <li key={id} className="todo-item">
                <Link to={`/task/${id}`} className="link">
                  {title.length > 30 ? `${title.slice(0, 30)}...` : title}
                </Link>
              </li>
            ))
          ) : (
            <p className="msg">Задач, соответствующих поиску, не найдено</p>
          )}
        </ul>
      </div>
    </div>
  );
};
