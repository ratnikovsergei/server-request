import { useState, useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import './TodoList.css';

export const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [refreshTodos, setRefreshTodos] = useState(false);
  const [newTodo, setNewTodo] = useState(null);
  const [newTodoName, setNewTodoName] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [isSorted, setIsSorted] = useState(false);

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
      headers: { 'Content-Type': 'application-json' },
      body: { title: newTodoName },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log('Задача переименована:', res);
        setRefreshTodos(!refreshTodos);
        setIsModal(false);
      });
  };

  const sortedList = isSorted
    ? [...todos].sort((a, b) => (a.title > b.title ? 1 : -1))
    : todos;

  return (
    <div className="main-container">
      {isModal && <Modal closeModal={() => setIsModal(false)} />}
      <div className="upper-block">
        <div>
          <input
            type="text"
            placeholder="Новая задача"
            onChange={({ target }) => setNewTodo(target.value)}
          />
          <button onClick={handleAddTodo}>Добавить</button>
        </div>
        <div>
          <input type="text" placeholder="Поиск задачи" />
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
          {sortedList.map(({ id, title }) => (
            <li key={id} className="todo-item">
              {title}
              <button type="button" onClick={() => setIsModal(true)}>
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
          ))}
        </ul>
      </div>
    </div>
  );
};
