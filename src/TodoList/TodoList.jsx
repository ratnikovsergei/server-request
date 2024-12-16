import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { Modal } from '../Modal/Modal';
import './TodoList.css';

export const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [refreshTodos, setRefreshTodos] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [currentTodoId, setCurrentTodoId] = useState(null);
  const [newTodoName, setNewTodoName] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue] = useDebounce(searchValue, 300);

  useEffect(() => {
    fetch('http://localhost:3000/todos')
      .then((requestData) => requestData.json())
      .then((loadedTodos) => setTodos(loadedTodos));
  }, [refreshTodos]);

  const handleAddTodo = () => {
    fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo, completed: false }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log('Задача добавлена в список:', res);
        setRefreshTodos(!refreshTodos);
        setNewTodo('');
      });
  };

  const handleRemoveTodo = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((res) => {
        console.log('Задача удалена:', res);
        setRefreshTodos(!refreshTodos);
      });
  };

  const handleRenameTodo = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodoName, completed: false }),
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
          newTodoName={newTodoName}
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
              console.log(newTodo);
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
