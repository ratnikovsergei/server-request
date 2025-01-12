import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Modal } from '../Modal/Modal';
import { useTodos } from '../TodoContext';
import './TodoList.css';

export const TodoList = () => {
  const { todos, addTodo, removeTodo, renameTodo } = useTodos();
  const [newTodo, setNewTodo] = useState('');
  const [currentTodoId, setCurrentTodoId] = useState(null);
  const [newTodoName, setNewTodoName] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue] = useDebounce(searchValue, 300);

  const handleRenameTodo = () => {
    renameTodo(currentTodoId, newTodoName.trim());
    setIsModal(false);
    setNewTodoName('');
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
          <button
            className="add-btn"
            onClick={() => addTodo(newTodo)}
            disabled={!newTodo}
          >
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
                {title}
                <div className="todo-item-btns">
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
                      removeTodo(id);
                    }}
                  >
                    Удалить
                  </button>
                </div>
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
