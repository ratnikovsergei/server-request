import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);

    setTimeout(() => {
      fetch('https://dummyjson.com/todos/random/10')
        .then((requestData) => requestData.json())
        .then((res) => {
          setTodoItems(res);
        });
      setisLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="app">
      <div className="todo-list">
        <h1>Simple ToDo List</h1>
        <p color="red">{'(Data requested from DummyJSON.com)'}</p>
        {isLoading ? (
          'Requesting data, wait a second...'
        ) : (
          <ul>
            {todoItems.map((todo) => (
              <li className="todo-item" key={todo.id}>
                <input type="checkbox" />
                {todo.todo}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
