import { useState } from 'react';

export const useAddTodo = (refreshTodos, setRefreshTodos) => {
  const [newTodo, setNewTodo] = useState('');

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

  return { handleAddTodo, newTodo, setNewTodo };
};
