export const useRemoveTodo = (refreshTodos, setRefreshTodos) => {
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

  return { handleRemoveTodo };
};
