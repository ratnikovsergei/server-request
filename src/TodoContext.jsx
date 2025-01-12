import { createContext, useContext, useState, useEffect } from 'react';

const TodoContext = createContext();

export const useTodos = () => {
  return useContext(TodoContext);
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [refreshTodos, setRefreshTodos] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch('http://localhost:3000/todos');
      const loadedTodos = await response.json();
      setTodos(loadedTodos);
    };
    fetchTodos();
  }, [refreshTodos]);

  const addTodo = async (newTodo) => {
    const response = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo, completed: false }),
    });
    await response.json();
    setRefreshTodos(!refreshTodos);
  };

  const removeTodo = async (id) => {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE',
    });
    setRefreshTodos(!refreshTodos);
  };

  const renameTodo = async (id, newTitle) => {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle }),
    });
    setRefreshTodos(!refreshTodos);
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, removeTodo, renameTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
