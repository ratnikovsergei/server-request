import './App.css';
import { TodoList } from './TodoList/TodoList';
import { TodoProvider } from './TodoContext';

function App() {
  return (
    <TodoProvider>
      <div className="app">
        <h1>Список задач с использованием JSON Server + React Context</h1>
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;
