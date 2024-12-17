import { useState } from 'react';

export const useAddTodo = (refreshTodos, setRefreshTodos, todos) => {
  const [newTodo, setNewTodo] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleAddTodo = () => {
    if (todos.some((todo) => todo.title.toLowerCase() === newTodo.toLowerCase())) {
      setErrorMsg('Задача с таким названием уже есть в списке');
      return;
    }

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
        setErrorMsg('');
      });
  };

  return { handleAddTodo, newTodo, setNewTodo, errorMsg };
};
