import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Modal } from '../Modal/Modal';
import { useGetTodos, useAddTodo, useRemoveTodo } from '../hooks';
import './TodoList.css';

export const TodoList = () => {
  const [refreshTodos, setRefreshTodos] = useState(false);
  const { todos } = useGetTodos(refreshTodos);
  const { handleAddTodo, newTodo, setNewTodo } = useAddTodo(
    refreshTodos,
    setRefreshTodos
  );
  const { handleRemoveTodo } = useRemoveTodo(refreshTodos, setRefreshTodos);

  const [currentTodoId, setCurrentTodoId] = useState(null);
  const [newTodoName, setNewTodoName] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue] = useDebounce(searchValue, 300);

  const handleRenameTodo = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodoName.trim(), completed: false }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log('Задача переименована:', res);
        setRefreshTodos(!refreshTodos);
        setIsModal(false);
        setNewTodoName('');
      });
  };

  const sortedList = isSorted
    ? [...todos].sort((a, b) => (a.title > b.title ? 1 : -1))
    : todos;

  const filteredList = sortedList.filter((todo) =>
    todo.title.toLowerCase().includes(debouncedSearchValue.toLowerCase())
  );

  return (
    <div className="main-container">
      {isModal && (
        <Modal
          currentId={currentTodoId}
          handleRename={handleRenameTodo}
          oldTodoName={newTodoName}
          setNewTodoName={setNewTodoName}
          close={() => setIsModal(false)}
        />
      )}
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
          <button onClick={handleAddTodo} disabled={!newTodo}>
            Добавить
          </button>
        </div>
        <div>
          <input
            type="text"
            name="search-todo"
            placeholder="Поиск задачи"
            value={searchValue}
            onChange={({ target }) => setSearchValue(target.value)}
          />
          <button onClick={() => setSearchValue('')}>Сбросить</button>
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
          {filteredList.length > 0 ? (
            filteredList.map(({ id, title }) => (
              <li key={id} className="todo-item">
                {title}
                <button
                  type="button"
                  onClick={() => {
                    setCurrentTodoId(id);
                    setNewTodoName(title);
                    setIsModal(true);
                  }}
                >
                  Изменить
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleRemoveTodo(id);
                  }}
                >
                  Удалить
                </button>
              </li>
            ))
          ) : (
            <p>Нет задач, соответствующих поиску</p>
          )}
        </ul>
      </div>
    </div>
  );
};
