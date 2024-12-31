import './App.css';
import { TodoList } from './TodoList/TodoList';
import { TodoPage } from './TodoPage/TodoPage';
import { NotFound } from './NotFound/NotFound';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <h1>Список задач с использованием JSON Server</h1>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/task/:id" element={<TodoPage />} />
        <Route path="/404" element={<TodoList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
