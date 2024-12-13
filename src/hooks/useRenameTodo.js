import { useState } from 'react';

export const useRenameTodo = () => {
  const [newTodoName, setNewTodoName] = useState(null);

  const handleRenameTodo = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application-json' },
      body: { title: newTodoName },
    });
  };

  return { handleRenameTodo, newTodoName, setNewTodoName };
};
