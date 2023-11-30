import React from "react";
import { useTodo } from "../contexts";
import { Link } from "react-router-dom";

const TaskList = () => {
  const { todos, deleteTodo, toggleComplete } = useTodo();
  console.log(todos);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-4">Task List</h2>
      {todos.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between border-b border-gray-300 py-2"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className="mr-2"
                />
                <span
                  className={
                    todo.completed ? "line-through text-gray-500" : "text-black"
                  }
                >
                  <Link
                    to={`/task-detail/${todo.id}`}
                    className={
                      todo.completed
                        ? "line-through text-gray-500"
                        : "text-black"
                    }
                  >
                    {todo.todo}
                  </Link>
                </span>
              </div>
              <div>
                {" "}
                <span className={getPriorityColor(todo.priority)}>
                  {todo.priority.charAt(0).toUpperCase() +
                    todo.priority.slice(1)}
                </span>
              </div>
              <div className="flex items-center">
                <Link
                  to={`/edit/${todo.id}`}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  Edit
                </Link>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
