import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { TodoProvider } from "./contexts";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import EditTaskForm from "./components/EditTaskForm";
import TaskDetail from "./components/TaskDetail";
function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <Router>
      <TodoProvider
        value={{ todos, addTodo, deleteTodo, updateTodo, toggleComplete }}
      >
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Task Management App</h1>

          {/* Navigation Bar */}
          <nav className="mb-4">
            <ul className="flex space-x-4">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/my-tasks">My Tasks</Link>
              </li>
            </ul>
          </nav>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<AddTaskForm />} />
            <Route path="/my-tasks" element={<TaskList />} />
            <Route path="/edit/:todoId" element={<EditTaskForm />} />
            <Route path="/task-detail/:todoId" element={<TaskDetail />} />
          </Routes>
        </div>
      </TodoProvider>
    </Router>
  );
}

export default App;
