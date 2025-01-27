import { TodoForm, TodoList } from "../features";

function App() {
  return (
    <div className="max-w-4xl mx-auto sm:mt-8 p-4 bg-gray-100 rounded">
      <h2 className="mt-3 mb-6 text-2xl font-bold text-center uppercase">
        Todo App with Redux
      </h2>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
