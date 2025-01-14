import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import './TodoPage.css';

export const TodoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState({});
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/todos/${id}`)
      .then((response) => response.json())
      .then((loadedTodo) => {
        setTodo(loadedTodo);
        setNewTodoName(loadedTodo.title);
      });
  }, [id]);

  const handleRenameTodo = (newValue) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newValue.trim(), completed: todo.completed }),
    }).then(() => {
      setTodo((prevTodo) => ({ ...prevTodo, title: newValue }));
      setIsModal(false);
    });
  };

  const handleRemoveTodo = () => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE',
    }).then(() => navigate('/'));
  };

  return (
    <div className="todo-page">
      {isModal && (
        <Modal
          currentId={id}
          handleRename={handleRenameTodo}
          oldTodoName={todo.title}
          close={() => setIsModal(false)}
        />
      )}

      <h2 className="todo-title">{todo.title}</h2>
      <div className="buttons">
        <button onClick={() => setIsModal(true)}>Изменить</button>
        <button onClick={handleRemoveTodo}>Удалить задачу</button>
        <button onClick={() => navigate(-1)}>Назад</button>
      </div>
    </div>
  );
};
