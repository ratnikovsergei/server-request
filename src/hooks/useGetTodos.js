import { useState, useEffect } from 'react';

export const useGetTodos = (refreshTodos) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/todos')
      .then((requestData) => requestData.json())
      .then((loadedTodos) => setTodos(loadedTodos));
  }, [refreshTodos]);

  return { todos };
};
