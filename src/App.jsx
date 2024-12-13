import './App.css';
import { TodoList } from './TodoList/TodoList';

function App() {
  return (
    <div className="app">
      <h1>Список задач с использованием JSON Server</h1>
      <TodoList />
    </div>
  );
}

export default App;
